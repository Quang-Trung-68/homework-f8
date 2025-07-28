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

export interface ExamGroupCreateI {
  await_time: number;
  class_id: string;
  name: string;
  start_time: string;
}

export interface ExamGroupResponseI {
  id: number;
  created_at: string;
  created_by:string | null;
  modified_at: string | null;
  modified_by: string | null;
  deleted_at: string | null;
  deleted_by: string | null;
  active: boolean;
  name: string;
  clas: {
    id: number;
    created_at: string;
    created_by: string | null;
    modified_at: string | null;
    modified_by: string | null;
    deleted_at: string | null;
    deleted_by: string | null;
    active: boolean;
    code: string;
    name: string;
    subject:string | null;
  };
  start_time: string;
  await_time: number;
  is_once: boolean;
  is_save_local: boolean;
}
