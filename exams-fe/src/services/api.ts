// src/api.ts
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// ===== TẠO INSTANCE AXIOS ===== //
export const api = axios.create({
  baseURL: "/api", // thay đổi nếu domain thật
  headers: {
    Accept: "application/json",
  },
  // withCredentials: true, // gửi cookie kèm request
});

// ===== TOKEN HANDLING ===== //

type AuthStorage = {
  state: {
    access: string;
    refresh: string;
  };
  version: number;
};

// Hàm lấy access token từ cookie (ưu tiên cookie riêng)
const getAccessToken = (): string | null => {
  // Ưu tiên lấy từ cookie riêng (có thời hạn 15p)
  const directToken = Cookies.get("access_token");
  if (directToken) return directToken;
  
  // Fallback: lấy từ auth-storage
  const authStr = Cookies.get("auth-storage");
  if (!authStr) return null;
  try {
    const auth: AuthStorage = JSON.parse(decodeURIComponent(authStr));
    return auth?.state?.access || null;
  } catch {
    return null;
  }
};

// Hàm lấy refresh token từ cookie (ưu tiên cookie riêng)
const getRefreshToken = (): string | null => {
  // Ưu tiên lấy từ cookie riêng (có thời hạn 7 ngày)
  const directToken = Cookies.get("refresh_token");
  if (directToken) return directToken;
  
  // Fallback: lấy từ auth-storage
  const authStr = Cookies.get("auth-storage");
  if (!authStr) return null;
  try {
    const auth: AuthStorage = JSON.parse(decodeURIComponent(authStr));
    return auth?.state?.refresh || null;
  } catch {
    return null;
  }
};

// Hàm cập nhật lại cookie auth-storage với thời hạn phân biệt
const updateAuthStorage = (access: string, refresh: string) => {
  // Lưu access token với thời hạn 15 phút
  Cookies.set("access_token", access, {
    expires: 1 / 96, // 15 phút
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  
  // Lưu refresh token với thời hạn 7 ngày
  Cookies.set("refresh_token", refresh, {
    expires: 7, // 7 ngày
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  
  // Lưu auth-storage cho compatibility
  const auth: AuthStorage = {
    state: {
      access,
      refresh,
    },
    version: 0,
  };
  Cookies.set("auth-storage", JSON.stringify(auth), {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
};

// Hàm xóa toàn bộ token và user data
const clearAuthData = () => {
  // Xóa tất cả cookie liên quan
  Cookies.remove("auth-storage", { path: "/" });
  Cookies.remove("access_token", { path: "/" });
  Cookies.remove("refresh_token", { path: "/" });
};

// Hàm redirect về login với thông báo
const redirectToLogin = (message: string = "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại!") => {
  toast.error(message);
  // Delay nhỏ để toast hiện trước khi redirect
  setTimeout(() => {
    window.location.href = "/login";
  }, 2000);
};

// ===== INTERCEPTOR: GẮN TOKEN VÀO HEADER ===== //
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== INTERCEPTOR: XỬ LÝ 401/403 (REFRESH TOKEN) ===== //
const refreshAuthLogic = async (failedRequest: any) => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    console.warn("No refresh token available");
    clearAuthData();
    redirectToLogin("Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập lại!");
    return Promise.reject("No refresh token available");
  }

  try {
    console.log("Attempting to refresh token...");
    
    const res = await axios.post("/api/login/get_new_token/", {
      refresh: refreshToken,
    });

    const newAccessToken = res.data.access;
    const newRefreshToken = res.data.refresh || refreshToken; // Sử dụng refresh mới nếu có
    
    // Cập nhật token mới
    updateAuthStorage(newAccessToken, newRefreshToken);
    
    // Cập nhật header cho request đã fail
    failedRequest.response.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
    
    console.log("Token refreshed successfully");
    return Promise.resolve();
    
  } catch (refreshError: any) {
    console.error("Refresh token failed:", refreshError);
    
    // Xử lý các loại lỗi refresh
    const status = refreshError?.response?.status;
    const errorMessage = refreshError?.response?.data?.message || refreshError?.message;
    
    if (status === 401) {
      // Refresh token hết hạn hoặc không hợp lệ
      clearAuthData();
      redirectToLogin("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
    } else if (status === 403) {
      // Refresh token bị cấm (có thể user bị khóa)
      clearAuthData();
      redirectToLogin("Tài khoản của bạn không có quyền truy cập. Vui lòng liên hệ quản trị viên!");
    } else if (status === 400) {
      // Refresh token không đúng định dạng
      clearAuthData();
      redirectToLogin("Thông tin đăng nhập không hợp lệ. Vui lòng đăng nhập lại!");
    } else if (!status) {
      // Lỗi network
      toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!");
    } else {
      // Lỗi khác
      clearAuthData();
      redirectToLogin(`Có lỗi xảy ra: ${errorMessage || "Vui lòng đăng nhập lại!"}`);
    }
    
    return Promise.reject(refreshError);
  }
};

// Cài đặt auto-refresh
createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [401], // Chỉ refresh khi gặp 401
  pauseInstanceWhileRefreshing: true, // Tạm dừng các request khác khi đang refresh
});

// ===== INTERCEPTOR: XỬ LÝ CÁC LỖI KHÁC ===== //
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    
    // Xử lý lỗi 403 không liên quan đến auth (không cần refresh)
    if (status === 403 && error?.response?.data?.code === "PERMISSION_DENIED") {
      toast.error("Bạn không có quyền thực hiện thao tác này!");
      return Promise.reject(error);
    }
    
    // Xử lý các lỗi server khác
    if (status >= 500) {
      toast.error("Lỗi server. Vui lòng thử lại sau!");
    } else if (status === 404) {
      toast.error("Không tìm thấy tài nguyên yêu cầu!");
    } else if (status === 400) {
      const message = error?.response?.data?.message || "Dữ liệu không hợp lệ!";
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// ===== EXPORT UTILITY FUNCTIONS ===== //
export { 
  getAccessToken, 
  getRefreshToken, 
  updateAuthStorage, 
  clearAuthData,
  redirectToLogin 
};