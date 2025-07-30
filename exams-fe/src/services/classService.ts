import { useLoadingStore } from "../stores/loadingStore";
import type { ClassI } from "../types/classes.types";
import { api } from "./api";
import { toast } from "react-toastify";

export const classService = {
  getClasses: async (): Promise<ClassI[]> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading();
      const response = await api.get("master/class/");
      toast.info("Lấy dữ liệu thành công!");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Lấy dữ liệu thất bại!");
      return [];
    } finally {
      stopLoading();
    }
  },

  createClass: async (formData: ClassI): Promise<string> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading();
      const response = await api.post("master/class/", formData);
      toast.success("Tạo lớp thành công!");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Tạo lớp thất bại!");
      throw error;
    } finally {
      stopLoading();
    }
  },
  getClass: async (id: number): Promise<ClassI> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading();
      const response = await api.get(`master/class/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      stopLoading();
    }
  },
};
