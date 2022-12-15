import React, {FC} from 'react';
import {Card, Layout, Row} from "antd";
import SignupForm from "../components/SignupForm";
import '../App.css'

const Signup: FC = () => {

    return (
        <Layout>
            <Row justify='center' align='middle' className='h100'>
                <Card>
                    <h1 className='h1'>Sign up</h1>
                    <SignupForm />
                </Card>
            </Row>
        </Layout>
    );
};

export default Signup;