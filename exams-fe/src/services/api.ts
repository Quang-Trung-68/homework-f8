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

// Hàm lấy access token từ cookie
const getAccessToken = (): string | null => {
  const authStr = Cookies.get("auth-storage");
  if (!authStr) return null;
  try {
    const auth: AuthStorage = JSON.parse(decodeURIComponent(authStr));
    return auth?.state?.access || null;
  } catch {
    return null;
  }
};

// Hàm lấy refresh token từ cookie
const getRefreshToken = (): string | null => {
  const authStr = Cookies.get("auth-storage");
  if (!authStr) return null;
  try {
    const auth: AuthStorage = JSON.parse(decodeURIComponent(authStr));
    return auth?.state?.refresh || null;
  } catch {
    return null;
  }
};

// Hàm cập nhật lại cookie auth-storage
const updateAuthStorage = (access: string, refresh: string) => {
  const auth: AuthStorage = {
    state: {
      access,
      refresh,
    },
    version: 0,
  };
  Cookies.set("auth-storage", JSON.stringify(auth), {
    expires: 7,          // Cookie 7 ngày
    secure: true,        // Chỉ qua HTTPS
    sameSite: "Strict",  // Ngăn CSRF
    path: "/",           
  });
};

// ===== INTERCEPTOR: GẮN TOKEN VÀO HEADER ===== //
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== INTERCEPTOR: XỬ LÝ 401 (REFRESH TOKEN) ===== //
const refreshAuthLogic = async (failedRequest: any) => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return Promise.reject("No refresh token available");
  }

  try {
    const res = await axios.post("/api/login/get_new_token/", {
      refresh: refreshToken,
    });

    const newAccessToken = res.data.access;
    updateAuthStorage(newAccessToken, refreshToken);

    failedRequest.response.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
    return Promise.resolve();
  } catch (err) {
    toast.error("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại!");
    window.location.href = "/login";
    return Promise.reject(err);
  }
};

// Cài đặt auto-refresh
createAuthRefreshInterceptor(api, refreshAuthLogic);
