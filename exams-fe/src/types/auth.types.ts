export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginRequestI {
  email: string ;
  password: string;
}

export interface LoginResponseI {
  access: string;
  refresh: string;
}

export interface RefreshRequestI {
  refresh: string
}


export interface UserCreateRequestI {
  name: string;
  email: string;
  role: string;
  status: string ;
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
