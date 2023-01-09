import React, { useEffect } from "react";
import AboutMe from "../AboutMe/AboutMe";
import Contact from "../Contact/Contact";
import Services from "../Services/Services";
import Jumbotron from "./../../../components/shared/Jumbotron/Jumbotron";
import { Helmet } from "react-helmet-async";
import Main from "./../../../layout/Main/Main";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Main>
            <Helmet>
                <title>ShohagTutor</title>
            </Helmet>
            <Jumbotron />
            <AboutMe />
            <Services />
            <Contact />
        </Main>
    );
};

export default Home;
