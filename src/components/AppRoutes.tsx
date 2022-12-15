import React, {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRoutes: FC = () => {
    const {isAuth} = useTypedSelector(state => state.auth);

    return (
        isAuth ?
            <Routes>
                {privateRoutes.map(route => <Route key={route.path}
                                                   path={route.path}
                                                   element={route.element}/>)}
                <Route path='*' element={<Navigate replace to={RouteNames.EVENT} />}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route => <Route key={route.path}
                                                  path={route.path}
                                                  element={route.element}/>)}

                <Route path='*' element={<Navigate replace to={RouteNames.LOGIN} />}/>
            </Routes>
    );
};

export default AppRoutes;