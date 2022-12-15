import {authReducer} from "./auth/auth-reducer";
import {combineReducers} from "redux";
import {eventsReducer} from "./events/events-reducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    events: eventsReducer,
});