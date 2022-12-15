import React, {FC, useState} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";
import {IUserFB} from "../models/IUserFB";
import {Button, DatePicker, Form, Input, Select} from "antd";
import {Dayjs} from "dayjs";
import {rules} from "../utils/rules";
import {formatDate} from "../utils/formatDate";

interface AddEventFormProps {
    guests: IUserFB[];
    submit: (event: IEvent) => void;
}

const AddEventForm: FC<AddEventFormProps> = (props) => {
    const [form] = Form.useForm()
    const [event, setEvent] = useState<IEvent>({
        id: String(Date.now()),
        author: '',
        guests: [],
        date: '',
        title: '',
        description: '',
        status: 'default'
    } as IEvent);
    const {user} = useTypedSelector(state => state.auth);

    const selectDate = (date: Dayjs | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date, 'YYYY.MM.DD')});
        }
    }

    const submit = () => {
        props.submit({...event, author: user.email});
        form.resetFields();
        setEvent({} as IEvent);
    }

    return (
        <Form
            form={form}
            name="add-event-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={submit}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[rules.required()]}
            >
                <Input value={event.title}
                       onChange={(e) => setEvent({...event, title: e.target.value})}/>
            </Form.Item>

            <Form.Item
                label="Guest"
                name="guest"
            >
                <Select mode="multiple" placeholder='Add guest' style={{ width: 230 }}
                        onChange={(guests: string[]) => setEvent({...event, guests})}>
                    {props.guests.map(guest =>
                        <Select.Option key={guest.email} value={guest.email}>
                            {guest.email}
                        </Select.Option>)
                    }
                </Select>
            </Form.Item>

            <Form.Item label="Date"
                       name="date"
                       rules={[rules.required(), rules.isDatePassed('You cannot add an event on a passed date')]}
            >
                <DatePicker onChange={(date) => selectDate(date)}/>
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[rules.required()]}
            >
                <Input.TextArea maxLength={500}
                                style={{ height: 120, resize: 'none' }}
                                value={event.description}
                                onChange={(e) => setEvent({...event, description: e.target.value})}/>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddEventForm;