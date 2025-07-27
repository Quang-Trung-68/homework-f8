import type { ClassI } from "../types/classes.types";
import { api } from "./api";

export const classService = {
  getClasses: async (accessToken: string): Promise<ClassI[]> => {
    try {
      const response = await api.get("master/class/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  createClass: async (accessToken:string, formData: ClassI): Promise<string> => {
    try {
      const response = await api.post("master/class/", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response.data ;
    } catch (error) {
      console.log(error);
      return "";
    }
  },
};
