import {createRoot} from 'react-dom/client';

import {Fragment} from "react";

import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@css/main.css"
import Note from "@components/Note";
import translation from "@utils/i18n";
import GuardedRoute from "@components/GuardedRoute";
import HomeComponent from "@components/HomeComponent";
import Header from "@components/Header";

translation();

const Default = () => {
    return (
        <Fragment>

            <Outlet/>
        </Fragment>
    )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <main>
        <BrowserRouter>
            <Routes>
                <Route element={<GuardedRoute/>}>
                    <Route exact path="/home" element={<HomeComponent/>}/>
                    <Route path={`/${SUBJECT}/*`} element={<Note/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </main>
);
