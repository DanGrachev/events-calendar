import React, {FC, useEffect, useState} from 'react';
import {Button, Layout, Modal, Row} from "antd";
import CalendarForm from "../components/CalendarForm";
import AddEventForm from "../components/AddEventForm";
import {IEvent} from "../models/IEvent";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Events: FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const {user} = useTypedSelector(state => state.auth);
    const {events, guests} = useTypedSelector(state => state.events)
    const {fetchGuests, fetchEvents, createEvent, removeEvent} = useActions();

    useEffect(() => {
        fetchGuests(user.email);
        fetchEvents(user.email);
    }, [])


    const submit = (event: IEvent) => {
        setIsVisible(false);
        createEvent(event);
    }

    return (
        <Layout>
            <CalendarForm events={events} user={user} removeEvent={removeEvent}/>

            <Row justify='center' align='middle'>
                <Button onClick={() => setIsVisible(true)}
                        type='primary'
                        danger
                        size='large'>Add event</Button>
            </Row>

            <Modal title="Create event"
                   footer={null}
                   open={isVisible}
                   onCancel={() => setIsVisible(false)}>
                <AddEventForm guests={guests} submit={submit} />
            </Modal>

        </Layout>
    );
};

export default Events;