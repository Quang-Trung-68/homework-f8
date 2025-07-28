import { api } from "./api";
import type { ExamGroupI } from "../types/exam.types";

export const examService = {
    getExamGroup : async (id: number) :Promise<ExamGroupI[]> =>{
        try {
            const response = await api.get(`exam_group/?class_id=${id}`)
            return response.data
        } catch (error) {
            console.log(error);
            return []
        }
    }
}