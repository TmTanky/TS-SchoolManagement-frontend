import { Iaction } from "../../interfaces/action";

export const isUserLoggedInReducer = (state = false, action: Iaction) => {
    switch (action.type) {
        case 'LOGIN_TRUE':
            return {
                state: true
            }
        case 'LOGIN_FALSE':
            return {
                state: false
            }
        default: {
            return state
        }    
    }
}