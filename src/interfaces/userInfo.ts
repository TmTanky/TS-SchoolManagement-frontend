export enum UserRole {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student"
}

export interface IuserInfo {
    _id?: string
    firstName?: string
    middleName?: string
    lastName?: string
    email?: string
    role?: UserRole
    subjects?: string[]
}