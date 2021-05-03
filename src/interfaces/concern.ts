import { IuserInfo } from "./userInfo";

export interface Iconcern {
    _id?: string
    title?: string
    concern?: string
    ticketBy?: IuserInfo
    isResolved?: boolean
}