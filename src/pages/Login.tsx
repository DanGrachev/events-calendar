import React, {FC} from 'react';
import {Card, Layout, Row} from "antd";
import LoginForm from "../components/LoginForm";
import '../App.css'

const Login: FC = () => {

    return (
        <Layout>
            <Row justify='center' align='middle' className='h100'>
                <Card>
                    <h1 className='h1'>Login</h1>
                    <LoginForm />
                </Card>
            </Row>
        </Layout>
    );
};

export default Login;