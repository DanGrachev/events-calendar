import React from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Events from "../pages/Events";


export interface IRoutes {
    path: string;
    element: React.ReactElement;
}

export enum RouteNames {
    LOGIN = 'login',
    SIGN_UP = 'signup',
    EVENT = '/'
}

export const publicRoutes: IRoutes[] = [
    {path: RouteNames.LOGIN, element: <Login />},
    {path: RouteNames.SIGN_UP, element: <Signup />},
]

export const privateRoutes: IRoutes[] = [
    {path: RouteNames.EVENT, element: <Events />},
]