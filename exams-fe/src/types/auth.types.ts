export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  access: string;
  refresh: string;
}

export interface RegisterData {
  name: string;
  email: string;
  role: "student" | null;
  status: "confirming" | null;
  password: string;
}

export interface AuthRegisterResponse {
  id: number;
  created_at: string;
  created_by: string | null;
  modified_at:string | null;
  modified_by:string | null;
  deleted_at:string | null;
  deleted_by:string | null;
  active: boolean;
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  school:string | null;
  parent_name:string | null;
  parent_phone:string | null;
  avata:string | null;
}
