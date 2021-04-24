import { IuserInfo } from "../../interfaces/userInfo"

export const loginSuccess = (data: IuserInfo) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: data
    }
}