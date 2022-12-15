import {AuthActions, AuthActionsEnum, AuthState} from "./types";
import {IUserFB} from "../../../models/IUserFB";


const initialState: AuthState = {
    isAuth: false,
    user: {} as IUserFB,
    isLoading: false,
    error: ''
}

export const authReducer = (state = initialState, action: AuthActions): AuthState => {
    switch (action.type) {
        case AuthActionsEnum.SET_AUTH:
            return {
                ...state,
                isAuth: action.payload,
                isLoading: false
            }
        case AuthActionsEnum.SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case AuthActionsEnum.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case AuthActionsEnum.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}