export interface UserI {
    id: number
    name: string
    role: "teacher" | "student"
    status: "confirming" | null | string;
}

export interface ClassI {
    code: string
    id: number
    name: string
    users: UserI[]
}