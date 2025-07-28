import { create } from "zustand";
import { examService } from "../services/examService";

import type { ExamGroupI } from "../types/exam.types";

interface ExamState {
    examGroupSelecting : ExamGroupI[];
    getExamGroup : (id: number)=> Promise<void>
}

export const useExamState = create<ExamState>((set,get)=>({
    examGroupSelecting:[],
    getExamGroup: async (id: number)=>{
        try {
            const data = await examService.getExamGroup(id);
            set({examGroupSelecting: data})
        } catch (error) {
            console.log(error);
        }
    }
}))