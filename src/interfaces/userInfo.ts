import { Iconcern } from "./concern";
import { Isubject } from "./subjects";

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
    subjects?: Isubject[] | null
    instructorsSubjects?: Isubject[] | null
    myTickets?: Iconcern[]
}