import React from "react";
import NavBar from './../../components/shared/NavBar/NavBar';
import Footer from './../../components/shared/Footer/Footer';


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
