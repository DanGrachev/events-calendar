import {IEvent} from "../../../models/IEvent";
import {IUserFB} from "../../../models/IUserFB";

export interface EventsState {
    events: IEvent[];
    guests: IUserFB[];
}

export enum EventsActionTypes {
    SET_EVENTS = 'SET_EVENTS',
    SET_GUESTS = 'SET_GUESTS',
    ADD_EVENT = 'ADD_EVENT',
    DELETE_EVENT = 'DELETE_EVENT'
}

export interface SetEventsAction {
    type: EventsActionTypes.SET_EVENTS;
    payload: IEvent[];
}
export interface SetGuestsAction {
    type: EventsActionTypes.SET_GUESTS;
    payload: IUserFB[];
}
export interface AddEventAction {
    type: EventsActionTypes.ADD_EVENT;
    payload: IEvent;
}

export interface DeleteEventAction {
    type: EventsActionTypes.DELETE_EVENT;
    payload: string;
}

export type EventsActions =
    SetEventsAction
    | SetGuestsAction
    | AddEventAction
    | DeleteEventAction;