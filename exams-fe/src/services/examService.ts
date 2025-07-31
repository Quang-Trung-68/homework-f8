import { api } from "./api";
import type {
  ExamGroupI,
  ExamGroupCreateI,
  ExamGroupResponseI,
  ExamResponseI,
  ExamDetailResponseI,
} from "../types/exam.types";
import { useLoadingStore } from "../stores/loadingStore";
import { toast } from "react-toastify";

export const examService = {
  getExamGroup: async (id: number): Promise<ExamGroupI[]> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading();
      const response = await api.get(`exam_group/?class_id=${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      stopLoading();
    }
  },
  createExamGroup: async (
    examGroup: ExamGroupCreateI
  ): Promise<ExamGroupResponseI | string> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading();
      const response = await api.post(`exam_group/`, examGroup);
      toast.success("Tạo bài thi thành công!");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Tạo bài thi thất bại!");
      throw error;
    } finally {
      stopLoading();
    }
  },
  updateExamGroup: async (
    id: number,
    formData: ExamGroupCreateI
  ): Promise<ExamDetailResponseI> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading();
      const response = await api.put(`exam_group/${id}`, formData);
      toast.success("Chỉnh sửa bài thi thành công!");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Tạo bài thi thất bại!");
      throw error;
    } finally {
      stopLoading();
    }
  },
  getExam: async (id: number): Promise<ExamResponseI> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading();
      const response = await api.get(`exam_group/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error();
    } finally {
      stopLoading();
    }
  },
  getExamDetailList: async (id: number): Promise<ExamDetailResponseI[]> => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    try {
      startLoading();
      const response = await api.get(`exam/?exam_group=${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error();
    } finally {
      stopLoading();
    }
  },
};
