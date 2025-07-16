import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { authService } from "../services/authService";

import type { User, LoginCredentials, RegisterData } from "../types/auth.types";
import { Token } from "@mui/icons-material";

interface AuthState {
  // State
  //   user: User | null;
  //   token: string | null;
  //   isAuthenticated: boolean;
  //   loading: boolean;
  //   error: string | null;

  access: string | null;
  refresh: string | null;

  //   Action
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  //   logout: () => Promise<void>;
  //   clearError: () => void;
  //   setLoading: (loading: boolean) => void;
  //   getCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // init state
      access: null,
      refresh: null,
      login: async (credentials: LoginCredentials) => {
        // set({loading: true, error: null});
        try {
          const response = await authService.login(credentials);
          set({
            access: response.access,
            refresh: response.refresh,
          });
        } catch (error) {
          console.log(error);
        }
      },
      register: async (userData: RegisterData) =>{
        try {
            const response = await authService.register(userData);

        } catch (error) {
            console.log(error);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        access: state.access,
        refresh: state.refresh,
      }),
    }
  )
);
