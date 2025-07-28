// import axios from "axios";
// const baseURL = "https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com";

// export const api = axios.create({
//   baseURL: "/api",
//   headers: {
//     Accept: "application/json",
//   },
//   withCredentials: false,
// });

// export const api = axios.create({
//   baseURL: baseURL,
//   headers: {
//     Accept: "application/json",
//   },
//   withCredentials: true,
// });

// src/api.ts
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

// Tạo instance axios
export const api = axios.create({
  baseURL: "/api", // hoặc domain thật nếu không dùng proxy
  headers: {
    Accept: "application/json",
  },
});

// Hàm lấy access token từ localStorage
const getAccessToken = () => {
  return JSON.parse(localStorage.getItem("auth-storage") || "{}")?.state?.access;
};

// Hàm lấy refresh token
const getRefreshToken = () => {
  return JSON.parse(localStorage.getItem("auth-storage") || "{}")?.state?.refresh;
};

// Gắn Bearer token cho mỗi request
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Hàm xử lý khi gặp lỗi 401
const refreshAuthLogic = async (failedRequest: any) => {
  const refresh = getRefreshToken();
  const res = await axios.post("/api/login/get_new_token/", { refresh });

  const newAccess = res.data;

  // Cập nhật vào localStorage
  const oldAuth = JSON.parse(localStorage.getItem("auth-storage") || "{}");
  localStorage.setItem(
    "auth-storage",
    JSON.stringify({
      state: {
        access: newAccess.access,
        refresh: oldAuth?.state?.refresh,
      },
      version: 0,
    })
  );

  // Cập nhật header của request bị fail
  failedRequest.response.config.headers["Authorization"] = `Bearer ${newAccess}`;
  return Promise.resolve();
};

// Cài interceptor cho response
createAuthRefreshInterceptor(api, refreshAuthLogic);

