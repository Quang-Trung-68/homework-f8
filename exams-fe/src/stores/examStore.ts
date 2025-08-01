import { create } from "zustand";
import { examService } from "../services/examService";

import type { ExamGroupI,ExamGroupCreateI,ExamResponseI, ExamDetailResponseI, ExamCreatePayloadI } from "../types/exam.types";

interface ExamState {
  examGroupSelecting: ExamGroupI[];
  examSelecting: ExamResponseI ;
  examDetailList: ExamDetailResponseI[];
  getExamGroup: (id: number) => Promise<void>;
  clearExamGroup: () => void;
  createExamGroup: (examGroup:ExamGroupCreateI)=> Promise<void>;
  updateExamGroup:(id:number, formData:ExamGroupCreateI )=> Promise<void>;
  getExam : (id: number) => Promise <void>;
  getExamDetailList: (id:number) => Promise<void>;
  createExam : (formData: ExamCreatePayloadI)=> Promise <void>;
}

export const useExamState = create<ExamState>((set, get) => ({
  examGroupSelecting: [],
  examSelecting:{
    id: 0,
    name: "",
    clas: 0,
    start_time: "",
    await_time: 0,
    created_at: "",
    is_once: false,
    is_save_local: false,
    users: []
  },
  examDetailList:[]
  ,
  getExamGroup: async (id: number) => {
    try {
      const data = await examService.getExamGroup(id);
      set({ examGroupSelecting: data });
    } catch (error) {
      console.log(error);
    }
  },
  createExamGroup: async (examGroup: ExamGroupCreateI)=>{
    try {
      const data = await examService.createExamGroup(examGroup)
    } catch (error) {
      console.log(error);
    }
  },
  updateExamGroup: async (id:number, formData: ExamGroupCreateI)=>{
    try {
      const data = await examService.updateExamGroup(id, formData);
    } catch (error) {
      console.log(error);
    }
  }
  ,
  clearExamGroup: () => {
    set({ examGroupSelecting: [] });
  },
  getExam: async (id: number) =>{
    try {
      const data = await examService.getExam(id);
      set({examSelecting:data})
    } catch (error) {
      console.log(error);
    }
  },
  createExam: async (formData: ExamCreatePayloadI)=>{
    try {
      await examService.createExam(formData)
    } catch (error) {
      console.log(error);
    }
  }
  ,
  getExamDetailList : async (id:number)=>{
    try {
      const data = await examService.getExamDetailList(id);
      set({examDetailList: data})
    } catch (error) {
      console.log(error);
    }
  }
}));
