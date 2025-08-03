import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie"
import { authService } from "../services/authService";
import type { LoginCredentials, RegisterData } from "../types/auth.types";

// Định nghĩa type cho auth storage (giống api.ts)
type AuthStorage = {
  state: {
    access: string;
    refresh: string;
  };
  version: number;
};

// Cookie storage implementation với thời hạn khác nhau cho access/refresh
const cookieStorage = {
  getItem: (name: string): string | null => {
    const value = Cookies.get(name);
    return value ? decodeURIComponent(value) : null;
  },
  setItem: (name: string, value: string): void => {
    const parsedValue = JSON.parse(value);
    
    // Lưu access token riêng với thời hạn 15 phút
    if (parsedValue.access) {
      Cookies.set("access_token", parsedValue.access, {
        expires: 1 / 96, // 15 phút (1/96 ngày)
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
    }
    
    // Lưu refresh token riêng với thời hạn 7 ngày
    if (parsedValue.refresh) {
      Cookies.set("refresh_token", parsedValue.refresh, {
        expires: 7, // 7 ngày
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
    }
    
    // Tạo auth storage object cho zustand persist
    const authStorage: AuthStorage = {
      state: {
        access: parsedValue.access || "",
        refresh: parsedValue.refresh || "",
      },
      version: 0,
    };
    
    // Lưu auth-storage cookie (cho compatibility với api.ts)
    Cookies.set(name, JSON.stringify(authStorage), {
      expires: 7, // 7 ngày
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  },
  removeItem: (name: string): void => {
    Cookies.remove(name, { path: "/" });
    Cookies.remove("access_token", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });
  },
};

// Utility functions để đọc token từ cookie (ưu tiên cookie riêng)
const getAccessTokenFromCookie = (): string | null => {
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

const getRefreshTokenFromCookie = (): string | null => {
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

// Hàm cập nhật auth storage với thời hạn phân biệt
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

interface AuthState {
  access: string | null;
  refresh: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  updateTokens: (access: string, refresh: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      access: null,
      refresh: null,
      
      login: async (credentials: LoginCredentials) => {
        try {
          const response = await authService.login(credentials);
          set({
            access: response.access,
            refresh: response.refresh,
          });
          // Cập nhật cookie với cấu trúc chuẩn
          updateAuthStorage(response.access, response.refresh);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      
      register: async (userData: RegisterData) => {
        try {
          await authService.register(userData);
          // Có thể auto login sau khi register thành công
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      
      logout: () => {
        set({ access: null, refresh: null });
        // Xóa tất cả cookie liên quan
        Cookies.remove("auth-storage", { path: "/" });
        Cookies.remove("access_token", { path: "/" });
        Cookies.remove("refresh_token", { path: "/" });
      },
      
      // Method để cập nhật token (dùng khi refresh token)
      updateTokens: (access: string, refresh: string) => {
        set({ access, refresh });
        updateAuthStorage(access, refresh);
      },
      
      // Utility methods để lấy token từ cookie (ưu tiên cookie)
      getAccessToken: () => {
        return getAccessTokenFromCookie() || get().access;
      },
      
      getRefreshToken: () => {
        return getRefreshTokenFromCookie() || get().refresh;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => cookieStorage),
      partialize: (state) => ({
        access: state.access,
        refresh: state.refresh,
      }),
    }
  )
);

// Hook để check authentication status
export const useAuth = () => {
  const { access, refresh, getAccessToken, getRefreshToken } = useAuthStore();
  
  const isAuthenticated = () => {
    const accessToken = getAccessToken();
    return !!accessToken;
  };
  
  const hasValidTokens = () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    return !!(accessToken || refreshToken);
  };
  
  return {
    access,
    refresh,
    isAuthenticated: isAuthenticated(),
    hasValidTokens: hasValidTokens(),
    getAccessToken,
    getRefreshToken,
  };
};