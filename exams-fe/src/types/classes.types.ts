enum RoleI  {
    "teacher",
    "student"
}

export interface UserI {
    id: number
    name: string
    role: RoleI
    status: "confirming" | null | string;
}

export interface ClassI {
    code: string
    id?: number
    name: string
    users: UserI[]
}

export interface FormCreateClassI {
    code: string,
    name: string
}