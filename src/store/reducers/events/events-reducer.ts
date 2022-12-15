import {EventsActions, EventsActionTypes, EventsState} from "./types";

const initialState: EventsState = {
    events: [],
    guests: []
}

export const eventsReducer = (state = initialState, action: EventsActions): EventsState => {
    switch (action.type) {
        case EventsActionTypes.SET_EVENTS:
            return {
                ...state, events: action.payload
            }
        case EventsActionTypes.SET_GUESTS:
            return {
                ...state, guests: action.payload
            }
        case EventsActionTypes.ADD_EVENT:
            return {
                ...state,
                events: [...state.events, action.payload]
            }
        case EventsActionTypes.DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.payload)
            }
        default:
            return state;
    }
}
