import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./../../components/shared/NavBar/NavBar";
import Footer from "./../../components/shared/Footer/Footer";

const Main = () => {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Main;
