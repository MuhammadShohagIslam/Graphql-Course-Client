import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AboutMe from "../AboutMe/AboutMe";
import Contact from "../Contact/Contact";
import Services from "../Services/Services";
import Jumbotron from "./../../../components/shared/Jumbotron/Jumbotron";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>ShohagTutor</title>
            </Helmet>
            <Jumbotron />
            <AboutMe />
            <Services />
            <Contact />
        </>
    );
};

export default Home;
