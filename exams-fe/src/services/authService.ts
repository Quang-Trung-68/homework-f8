import { api } from "./api";
import type {
  LoginCredentials,
  AuthLoginResponse,
  RegisterData,
  AuthRegisterResponse,
} from "../types/auth.types";
import { useLoadingStore } from "../stores/loadingStore";
import { toast } from "react-toastify";
import axios from "axios";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthLoginResponse> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading();
      const response = await api.post<AuthLoginResponse>("login/", credentials);
      toast.success("Đăng nhập thành công!");
      return response.data;
    } catch (error: any) {
      stopLoading();
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Đã có lỗi xảy ra";

        if (status === 400) {
          toast.error("Thông tin đăng nhập không hợp lệ.");
        } else if (status === 401) {
          toast.error("Sai tài khoản hoặc mật khẩu.");
        } else if (status === 500) {
          toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
        } else {
          toast.error(`Lỗi: ${message}`);
        }
      } else {
        toast.error("Lỗi không xác định.");
      }

      throw error;
    } finally {
      stopLoading();
    }
  },
  register: async (userData: RegisterData): Promise<AuthRegisterResponse> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading();
      const response = await api.post<AuthRegisterResponse>(
        "master/user/",
        userData
      );
      toast.success("Đăng ký thành công!");
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message ||
          error.response?.data?.detail ||
          "Đã có lỗi xảy ra.";

        if (status === 400) {
          toast.error("Thông tin không hợp lệ. Vui lòng kiểm tra lại.");
        } else if (status === 409) {
          toast.error("Tài khoản đã tồn tại.");
        } else if (status === 500) {
          toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
        } else {
          toast.error(`Lỗi: ${message}`);
        }
      } else {
        toast.error("Lỗi không xác định.");
      }
      throw error;
    } finally {
      stopLoading();
    }
  },
};
