import { IuserInfo } from "./userInfo";

export interface Isubject {
    _id?: string
    name?: string
    instructor?: IuserInfo
    description?: string
    studentsWhoTake?: IuserInfo[]
}