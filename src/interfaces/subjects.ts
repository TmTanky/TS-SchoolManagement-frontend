import { IuserInfo } from "./userInfo";

export interface Isubject {
    _id?: string
    name?: string
    instructor?: IuserInfo | null
    description?: string
    studentsWhoTake?: IuserInfo[]
}