export interface ExamGroupI {
  id?: number;
  name: string;
  clas: number;
  start_time: string;
  await_time: number;
  created_at: string;
  is_once: boolean;
  is_save_local: boolean;
}
