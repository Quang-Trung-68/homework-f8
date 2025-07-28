import { api } from "./api";
import type { ExamGroupI,ExamGroupCreateI, ExamGroupResponseI } from "../types/exam.types";

export const examService = {
    getExamGroup : async (id: number) :Promise<ExamGroupI[]> =>{
        try {
            const response = await api.get(`exam_group/?class_id=${id}`)
            return response.data
        } catch (error) {
            console.log(error);
            return []
        }
    },
    createExamGroup : async (examGroup: ExamGroupCreateI) : Promise<ExamGroupResponseI | string> =>{
        try {
            const response = await api.post(`exam_group/`,examGroup)
            return response.data
        } catch (error) {
            console.log(error);
            return "Error when post exam group"
        }
    }
}