import { Iaction } from "../../interfaces/action"

const INITIAL_STATE = {
    user: {}
}

export const userReducer = (state = INITIAL_STATE, action: Iaction) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                user: {}
            }
        default:
            return state    
    }
}