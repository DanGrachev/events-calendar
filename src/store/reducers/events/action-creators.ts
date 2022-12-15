import {IEvent} from "../../../models/IEvent";
import {AddEventAction, DeleteEventAction, EventsActionTypes, SetEventsAction, SetGuestsAction} from "./types";
import {AppDispatch} from "../../index";
import {IUserFB} from "../../../models/IUserFB";
import {addDoc, collection, getDocs, deleteDoc, doc} from "firebase/firestore";
import {db} from "../../../firebase";

export const EventsActionCreators = {
    setEvents: (events: IEvent[]): SetEventsAction => ({type: EventsActionTypes.SET_EVENTS, payload: events}),
    setGuests: (guests: IUserFB[]): SetGuestsAction => ({type: EventsActionTypes.SET_GUESTS, payload: guests}),
    addEvent: (event: IEvent): AddEventAction => ({type: EventsActionTypes.ADD_EVENT, payload: event}),
    deleteEvent: (eventId: string) : DeleteEventAction => ({type: EventsActionTypes.DELETE_EVENT, payload: eventId}),
    fetchGuests: (email: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await getDocs(collection(db, 'guests'));
            const guestsList = response.docs.map(doc => ({
                uid: doc.data().uid,
                email: doc.data().email
            } as IUserFB)).filter(guest => guest.email !== email);

            dispatch(EventsActionCreators.setGuests(guestsList));
        } catch (e) {
            console.log('An error occurred during guests fetching', e)
        }
    },
    fetchEvents: (email: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await getDocs(collection(db, 'events'));
            const eventsList = response.docs.map(doc => ({
                ...doc.data(), id: doc.id,
            } as IEvent));

            const authorizedUserEvents = eventsList
                .filter(event => event.author === email || event.guests?.includes(email));

            dispatch(EventsActionCreators.setEvents(authorizedUserEvents));
        } catch (e) {
            console.log('An error occurred during events fetching', e)
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const docRef = await addDoc(collection(db, 'events'), event);
            const eventWithID = {...event, id: docRef.id}

            console.log(eventWithID);
            dispatch(EventsActionCreators.addEvent(eventWithID));
        } catch (e) {
            console.log(e)
        }
    },
    removeEvent: (eventId: string) => async (dispatch: AppDispatch) => {
        try {
            await deleteDoc(doc(db, 'events', eventId));
            dispatch(EventsActionCreators.deleteEvent(eventId));
        } catch (e) {
            console.log(e)
        }
    }
}