import { create } from "zustand";

import { classService } from "../services/classService";

import type { ClassI } from "../types/classes.types";

interface ClassState {
  classes: ClassI[];
  classSelecting: ClassI;
  getClasses: () => Promise<void>;
  createClass: (formData: ClassI) => Promise<void>;
  getClass: (id: number) => Promise<void>;
  clearClass:()=> void;
}


export const useClassState = create<ClassState>((set, get) => ({
  classes: [],
  classSelecting: {
    code: "",
    name: "",
    users: [],
  },
  getClasses: async () => {
    try {
      const data = await classService.getClasses();
      set({ classes: data });
    } catch (error) {
      console.log("Error when loading classes", error);
    }
  },
  createClass: async (formData: ClassI) => {
    try {
      const data = await classService.createClass(formData);
    } catch (error) {
      console.log("Error when create class", error);
    }
  },
  getClass: async (id: number) => {
    try {
      const data = await classService.getClass(id);
      set({ classSelecting: data });
    } catch (error) {
      console.log("Error when get a class", error);
    }
  },
  clearClass : ()=>{
    set({classSelecting:{
      code:"",
      name:"",
      users:[]
    }})
  }
}));
