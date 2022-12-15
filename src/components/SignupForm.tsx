import React, {FC} from 'react';
import {Button, Form, Input} from "antd";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IUser} from "../models/IUser";
import {rules} from "../utils/rules";
import {NavLink} from "react-router-dom";
import {useActions} from "../hooks/useActions";

const SignupForm: FC = () => {
    const {isLoading} = useTypedSelector(state => state.auth);
    const {createUser} = useActions();

    const submit = (formData: IUser) => {
        console.log(formData);
        createUser(formData);
    }

    return (
        <Form
            name="singup-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={submit}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[rules.required()]}
            >
                <Input placeholder='Enter email'/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required()]}
            >
                <Input.Password placeholder='Create a password'/>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Sing up
                </Button>
                <div style={{marginTop: '10px'}}>Or <NavLink to="/login">log in</NavLink></div>
            </Form.Item>
        </Form>
    );
};

export default SignupForm;