import { create } from "zustand";

import { classService } from "../services/classService";

import type { ClassI } from "../types/classes.types";

interface ClassState {
  classes: ClassI[];
  getClasses: () => Promise<void>;
  createClass: (formData: ClassI)=> Promise<void>;
}


export function decodeToken(token: string) {
  const payload = token.split(".")[1];
  const json = atob(payload);
  return JSON.parse(json);
}

// const info = decodeToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....");
// console.log(info.id, info.name, info.role);


export const useClassState = create<ClassState>((set, get) => ({
  classes: [],
  getClasses: async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth-storage") || "{}");
      const accessToken = authData?.state?.access;
      console.log(accessToken);
      const data = await classService.getClasses(accessToken);
      set({ classes: data });
    } catch (error) {
      console.log("Error when loading classes", error);
    }
  },
  createClass: async (formData: ClassI)=> {
    try {
      const authData = JSON.parse(localStorage.getItem("auth-storage") || "{}");
      const accessToken = authData?.state?.access;
      const info = decodeToken(accessToken);
      const data = await classService.createClass(accessToken,formData)
    } catch (error) {
      console.log("Error when create class",error);
    }
  },
}));
