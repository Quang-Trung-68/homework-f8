import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import Cookies from "js-cookie"

import { authService } from "../services/authService";
import type { LoginCredentials, RegisterData } from "../types/auth.types";

// Cookie storage implementation với bảo mật
const cookieStorage = {
  getItem: (name: string): string | null => {
    const value = Cookies.get(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: string): void => {
    const parsedValue = JSON.parse(value);
    
    // Lưu access token (15 phút)
    if (parsedValue.access) {
      Cookies.set("access_token", parsedValue.access, {
        expires: 1 / 96, // 15 phút (1/96 ngày)
        httpOnly: false, // Client-side cần truy cập
        secure: process.env.NODE_ENV === "production", // HTTPS trong production
        sameSite: "strict", // CSRF protection
        path: "/",
      });
    }
    
    // Lưu refresh token (7 ngày)
    if (parsedValue.refresh) {
      Cookies.set("refresh_token", parsedValue.refresh, {
        expires: 7, // 7 ngày
        httpOnly: false, // Client-side cần truy cập
        secure: process.env.NODE_ENV === "production", // HTTPS trong production
        sameSite: "strict", // CSRF protection
        path: "/",
      });
    }
    
    // Lưu state object chính
    Cookies.set(name, value, {
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

interface AuthState {
  access: string | null;
  refresh: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
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
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      
      register: async (userData: RegisterData) => {
        try {
          const response = await authService.register(userData);
          // Có thể auto login sau khi register thành công
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      
      logout: () => {
        set({ access: null, refresh: null });
      },
      
      // Utility methods để lấy token từ cookie
      getAccessToken: () => {
        return Cookies.get("access_token") || get().access;
      },
      
      getRefreshToken: () => {
        return Cookies.get("refresh_token") || get().refresh;
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