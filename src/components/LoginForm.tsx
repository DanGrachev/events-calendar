import React, {FC} from 'react';
import {Button, Form, Input} from "antd";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IUser} from "../models/IUser";
import {useActions} from "../hooks/useActions";
import {rules} from "../utils/rules";
import {NavLink} from "react-router-dom";

const LoginForm: FC = () => {
    const {isLoading} = useTypedSelector(state => state.auth);
    const {login} = useActions();

    const submit = (formData: IUser) => {
        login(formData);
    }

    return (
        <Form
            name="login-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={submit}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[rules.required('Enter your email')]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Enter your password')]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary"  htmlType="submit" loading={isLoading}>
                    Log in
                </Button>
            <div style={{marginTop: '10px'}}>Or <NavLink to="/signup">register now</NavLink></div>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;