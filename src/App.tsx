import React, {FC, useEffect} from 'react';
import {Layout} from "antd";
import Navbar from "./components/Navbar";
import AppRoutes from "./components/AppRoutes";
import {useActions} from "./hooks/useActions";
import {IUserFB} from "./models/IUserFB";
import {onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebase";
import "./App.css"

const App: FC = () => {
    const {setAuth, setUser} = useActions();

    useEffect(() => {
        if (localStorage.getItem('auth') && localStorage.getItem('user')) {
            setUser({email: localStorage.getItem('user')} as IUserFB);
            setAuth(true);
        }
        onAuthStateChanged(auth, (userData) => {
            if (userData) {
                setUser({email: userData.email} as IUserFB);
                setAuth(true);
            }
        });
    },[]);



    return (
        <Layout>
            <Navbar/>
            <Layout.Content>
                <AppRoutes/>
            </Layout.Content>
        </Layout>
  );
};

export default App;