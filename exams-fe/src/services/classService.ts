import { useLoadingStore } from "../stores/loadingStore";
import type { ClassI } from "../types/classes.types";
import { api } from "./api";

export const classService = {
  getClasses: async (): Promise<ClassI[]> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading();
      const response = await api.get("master/class/");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      stopLoading();
    }
  },

  createClass: async (formData: ClassI): Promise<string> => {
    try {
      const response = await api.post("master/class/", formData);
      return response.data;
    } catch (error) {
      console.log(error);
      return "";
    }
  },
  getClass: async (id: number): Promise<ClassI> => {
    try {
      const response = await api.get(`master/class/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return {
        code: "",
        name: "",
        users: [],
      };
    }
  },
};
