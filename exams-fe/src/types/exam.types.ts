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
  created_by: string | null;
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
    subject: string | null;
  };
  start_time: string;
  await_time: number;
  is_once: boolean;
  is_save_local: boolean;
}

interface classI {
  id: number;
  name: string;
  code: string;
}

interface UserI {
  id: number;
  name: string;
  role: string;
  email: string;
  classes: classI[];
  school: string | null;
  parent_name: string | null;
  parent_phone: string | null;
  avata: {
    id: number | null;
    url: string | null;
  };
}

export interface ExamResponseI {
  id: number;
  name: string;
  clas: number;
  start_time: string;
  await_time: number;
  created_at: string;
  is_once: boolean;
  is_save_local: boolean;
  users: UserI[];
}

interface QuestionI {
  correct_answer: string | null;
  id: number;
  index: number;
  type: string;
}

export interface ExamDetailResponseI {
  code: string;
  correct_answer?: unknown;
  description: null | string;
  exam_group: number;
  file: {
    id: number;
    key: string;
    url: string;
  };
  id: number;
  name: string;
  number_of_question: number;
  questions: QuestionI[];
  total_time: number;
}
