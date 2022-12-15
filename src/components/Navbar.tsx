import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const Navbar: FC = () => {
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const {logout} = useActions();

    return (
        <Layout.Header style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
            <Row>
                {isAuth ?
                    <>
                        <div style={{color: '#fff'}}>{user.email}</div>
                        <Menu theme='dark' mode='vertical' selectable={false} style={{display: 'flex', alignItems: 'center'}}>
                            <Menu.Item key={1} onClick={logout}>Logout</Menu.Item>
                        </Menu>
                    </>
                    :
                    <Menu theme='dark' mode='vertical' selectable={false}>
                        <Menu.Item key={1}>Login</Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;