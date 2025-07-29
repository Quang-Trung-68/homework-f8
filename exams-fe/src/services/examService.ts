import { api } from "./api";
import type {
  ExamGroupI,
  ExamGroupCreateI,
  ExamGroupResponseI,
  ExamResponseI,
  ExamDetailResponseI,
} from "../types/exam.types";
import { useLoadingStore } from "../stores/loadingStore";

export const examService = {
  getExamGroup: async (id: number): Promise<ExamGroupI[]> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading()
      const response = await api.get(`exam_group/?class_id=${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
    finally{
      stopLoading()
    }
  },
  createExamGroup: async (
    examGroup: ExamGroupCreateI
  ): Promise<ExamGroupResponseI | string> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading()
      const response = await api.post(`exam_group/`, examGroup);
      return response.data;
    } catch (error) {
      console.log(error);
      return "Error when post exam group";
    }
    finally{
      stopLoading()
    }
  },
  getExam: async (id: number): Promise<ExamResponseI> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading()
      const response = await api.get(`exam_group/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
    finally{
      stopLoading()
    }
  },
  getExamDetailList: async (id: number): Promise<ExamDetailResponseI[]> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading()
      const response = await api.get(`exam/?exam_group=${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
    finally{
      stopLoading()
    }
  },
};
