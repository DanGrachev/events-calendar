import {AuthActionCreators} from "./auth/action-creators";
import {EventsActionCreators} from "./events/action-creators";


export const actionCreators = {
    ...AuthActionCreators,
    ...EventsActionCreators,
}