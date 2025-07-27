import { create } from "zustand";

import { classService } from "../services/classService";

import type { ClassI } from "../types/classes.types";

interface ClassState {
  classes: ClassI[];
  getClasses: () => Promise<void>;
}

export const useClassState = create<ClassState>((set, get) => ({
  classes: [],
  getClasses: async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth-storage") || "{}");
      const accessToken = authData?.state?.access;
      const data = await classService.getClasses(accessToken);
      set({ classes: data });
    } catch (error) {
      console.log("Error when loading classes", error);
    }
  },
}));
