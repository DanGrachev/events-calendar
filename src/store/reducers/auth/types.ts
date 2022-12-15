import {IUserFB} from "../../../models/IUserFB";

export interface AuthState {
    isAuth: boolean;
    user: IUserFB;
    isLoading: boolean;
    error: string;
}

export enum AuthActionsEnum {
    SET_AUTH = 'SET_AUTH',
    SET_USER = 'SET_USER',
    SET_LOADING = 'SET_LOADING',
    SET_ERROR = 'SET_ERROR'
}

export interface SetAuthAction {
    type: AuthActionsEnum.SET_AUTH;
    payload: boolean;
}
export interface SetUserAction {
    type: AuthActionsEnum.SET_USER;
    payload: IUserFB;
}
export interface SetLoadingAction {
    type: AuthActionsEnum.SET_LOADING;
    payload: boolean;
}
export interface SetErrorAction {
    type: AuthActionsEnum.SET_ERROR;
    payload: string;
}

export type AuthActions =
    SetAuthAction
    | SetUserAction
    | SetLoadingAction
    | SetErrorAction;
