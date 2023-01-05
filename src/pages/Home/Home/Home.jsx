import React, { useEffect } from "react";
import AboutMe from "../AboutMe/AboutMe";
import Contact from "../Contact/Contact";
import Services from "../Services/Services";
import Jumbotron from "./../../../components/shared/Jumbotron/Jumbotron";
import { Helmet } from "react-helmet-async";
import Main from "./../../../layout/Main/Main";
import { useSubscription } from "@apollo/client";
import { SERVICE_CREATED_SUBSCRIPTION } from "./../../../graphql/subscriptions";
import { GET_ALL_SERVICES_UNDER_THE_LIMIT } from "./../../../graphql/queries";
import { toast } from "react-hot-toast";

const Home = () => {
    // subscription > post added
    const { data: newPost } = useSubscription(SERVICE_CREATED_SUBSCRIPTION, {
        onData:async ({ client, data }) => {
            const { getAllServicesUnderLimit } = client.cache.readQuery({
                query: GET_ALL_SERVICES_UNDER_THE_LIMIT,
                variables: {
                    limit: 3,
                },
            });
            // write the cached
            client.cache.writeQuery({
                query: GET_ALL_SERVICES_UNDER_THE_LIMIT,
                variables: {
                    limit: 3,
                },
                data: {
                    getAllServicesUnderLimit: [
                        data?.serviceCreated,
                        ...getAllServicesUnderLimit,
                    ],
                },
            });
            // show toast notification
            console.log(getAllServicesUnderLimit, data);
            toast.success("New post!");
        },
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    console.log(newPost);

    return (
        <Main>
            {JSON.stringify(newPost)}
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
