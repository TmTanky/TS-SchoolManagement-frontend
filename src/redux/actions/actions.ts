import { IuserInfo } from "../../interfaces/userInfo"

export const loginSuccess = (data: IuserInfo) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: data
    }
}

export const loginTrue = () => {
    return {
        type: 'LOGIN_TRUE'
    }
}

export const logoutSuccess = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export const loginFalse = () => {
    return {
        type: 'LOGIN_FALSE'
    }
}