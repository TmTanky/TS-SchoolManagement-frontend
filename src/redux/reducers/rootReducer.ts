import {combineReducers} from 'redux'
import { isUserLoggedInReducer } from './isUserLoggedIn'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
    user: userReducer,
    isLoggedIn: isUserLoggedInReducer
})