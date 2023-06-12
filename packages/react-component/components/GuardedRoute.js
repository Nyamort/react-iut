import React, {Fragment} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import Header from "@components/Header";

const GuardedRoute = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
        document.location.href = "/";
        return;
    }
    return (
        <Fragment>
            <Header/>
            <Outlet/>
        </Fragment>
    )
}

export default GuardedRoute;