import React, {FC, useState} from 'react';
import {IUserFB} from "../models/IUserFB";
import {IEvent} from "../models/IEvent";
import {Badge, Button, Calendar, Layout, Modal, Row} from "antd";
import dayjs, {Dayjs} from "dayjs";
import {formatDate} from "../utils/formatDate";
import {statusCheck} from "../utils/eventStatusCheck";

interface CalendarFormProps {
    events: IEvent[];
    user: IUserFB;
    removeEvent: (id: string) => void;
}

const CalendarForm: FC<CalendarFormProps> = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [date, setDate] = useState<Dayjs>(dayjs());

    const deleteEvent = (event: IEvent) => {
        setIsVisible(false);
        if (props.user.email === event.author) {
            props.removeEvent(event.id);
        } else {
            alert('Only author of the event can delete it');
        }
    }

    const dateCellRender = (value: Dayjs, fullInfo: boolean) => {
        const formattedDate = formatDate(value, 'YYYY.MM.DD');
        const currentDayEvents = props.events.filter(event => event.date === formattedDate);

        return (
            <div onClick={(e) => setIsVisible(true)} style={{height: '100%'}}>
                {!fullInfo && currentDayEvents.map((event, index) =>
                    <div key={index}><Badge status={statusCheck(event.date)} text={event.title}/></div>
                )}
                {fullInfo && currentDayEvents.map((event, index) =>
                    <div key={event.id} className='event' onClick={(e) => e.stopPropagation()}>
                        <div>
                            <div><span style={{fontWeight: 'bold'}}>Title:</span> {event.title}</div>
                            <div><span style={{fontWeight: 'bold'}}>Author:</span> {event.author}</div>
                            <div>
                                <span style={{fontWeight: 'bold'}}>
                                    {event.guests?.length > 1 ? 'Guests: ' : 'Guest: '}
                                </span>
                                {event.guests?.length > 1 ? event.guests.join(', ') : event.guests}
                            </div>
                            <div><span style={{fontWeight: 'bold'}}>Description:</span> {event.description}</div>
                            <div><Badge status={statusCheck(event.date)}
                                        text={event.status === 'default'
                                            ? '- Event is scheduled'
                                            : '- The event date has expired'}/></div>
                        </div>
                        <Button type='primary'
                                danger
                                onClick={() => deleteEvent(event)}>Delete</Button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <Layout>
            <Calendar dateCellRender={(date) => dateCellRender(date, false)}
                      onSelect={(date) => setDate(date)}/>

            <Modal title={`Events on ${formatDate(date, 'DD.MM.YYYY')}`}
                   open={isVisible} onCancel={() => setIsVisible(false)} footer={null}>
                {dateCellRender(date, true)}
            </Modal>
        </Layout>
    );
};

export default CalendarForm;