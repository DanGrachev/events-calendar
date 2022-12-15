import {IUser} from "../../../models/IUser";
import {IUserFB} from "../../../models/IUserFB";
import {AuthActionsEnum, SetAuthAction, SetErrorAction, SetLoadingAction, SetUserAction} from "./types";
import {AppDispatch} from "../../index";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth, db} from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import {EventsActionCreators} from "../events/action-creators";
import {IEvent} from "../../../models/IEvent";


export const AuthActionCreators = {
    setAuth: (isAuth: boolean): SetAuthAction => ({type: AuthActionsEnum.SET_AUTH, payload: isAuth}),
    setUser: (user: IUserFB): SetUserAction => ({type: AuthActionsEnum.SET_USER, payload: user}),
    setLoading: (isLoading: boolean): SetLoadingAction => ({type: AuthActionsEnum.SET_LOADING, payload: isLoading}),
    setError: (error: string): SetErrorAction => ({type: AuthActionsEnum.SET_ERROR, payload: error}),
    login: ({email, password}: IUser) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setLoading(true));
            const response = await signInWithEmailAndPassword(auth, email, password);
            const authorizedUser = response.user;

            if (authorizedUser && authorizedUser.email) {
                dispatch(AuthActionCreators.setUser({
                    email: authorizedUser.email, uid: authorizedUser.uid
                } as IUserFB));
                dispatch(AuthActionCreators.setAuth(true));
                localStorage.setItem('auth', 'true');
                localStorage.setItem('user', authorizedUser.email);
            }
        } catch (e) {
            alert(`An error occurred during authentication: ${e}`)
        } finally {
            dispatch(AuthActionCreators.setLoading(false));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        await signOut(auth);
        console.log('You are logged out');

        dispatch(AuthActionCreators.setAuth(false));
        dispatch(EventsActionCreators.setEvents([] as IEvent[]))
        dispatch(AuthActionCreators.setUser({} as IUserFB));
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
    },
    createUser: ({email, password}: IUser) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setLoading(true));
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user && user.email) {
                try {
                    const docRef = await addDoc(collection(db, "guests"), {
                        uid: user.uid,
                        email: user.email
                    } as IUserFB);

                } catch (e) {
                    console.error("Error adding document: ", e);
                }

                dispatch(AuthActionCreators.setUser({email: user.email, uid: user.uid} as IUserFB));
                dispatch(AuthActionCreators.setAuth(true));
            }
        } catch (e) {
            alert(`An error occurred during sign up: ${e}`);
        } finally {
            dispatch(AuthActionCreators.setLoading(false));
        }
    }
}