import { IuserInfo } from "./userInfo";

export interface Isubject {
    _id?: string
    name?: string
    description?: string
    studentsWhoTake?: IuserInfo[]
}