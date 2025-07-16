import { api } from "./api";
import type {
  LoginCredentials,
  AuthLoginResponse,
  RegisterData,
  AuthRegisterResponse,
} from "../types/auth.types";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthLoginResponse> => {
    try {
      const response = await api.post<AuthLoginResponse>("login/", credentials);
      return response.data;
    } catch (error) {
      console.log(error);
      return { access: "none", refresh: "none" };
    }
  },
  register: async (userData: RegisterData): Promise<AuthRegisterResponse> => {
    try {
      const response = await api.post<AuthRegisterResponse>(
        "master/user/",
        userData
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return {
        id: 0,
        created_at: "",
        created_by: "",
        modified_at: "",
        modified_by: "",
        deleted_at: "",
        deleted_by: "",
        active: false,
        name: "",
        email: "",
        password: "",
        role: "",
        status: "",
        school: "",
        parent_name: "",
        parent_phone: "",
        avata: "",
      };
    }
  },
};
