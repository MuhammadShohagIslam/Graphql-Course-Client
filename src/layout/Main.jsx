import React from "react";
import Footer from "../components/shared/Footer/Footer";
import NavBar from "../components/shared/NavBar/NavBar";

const Main = ({children}) => {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                {children}
            </main>
           <Footer/>
        </>
    );
};

export default Main;
