import { IuserInfo } from "./userInfo";

export interface Istate {
    user: {user: IuserInfo}
    isLoggedIn: boolean
}