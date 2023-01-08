import React, { useEffect } from "react";
import AboutMe from "../AboutMe/AboutMe";
import Contact from "../Contact/Contact";
import Services from "../Services/Services";
import Jumbotron from "./../../../components/shared/Jumbotron/Jumbotron";
import { Helmet } from "react-helmet-async";
import Main from "./../../../layout/Main/Main";
import { useSubscription } from "@apollo/client";
import {
    SERVICE_ADDED,
    SERVICE_UPDATED,
    SERVICE_REMOVED,
} from "./../../../graphql/subscriptions";
import {
    GET_ALL_SERVICES_UNDER_THE_LIMIT,
    GET_ALL_SERVICES_BY_PAGE,
} from "./../../../graphql/queries";
import { toast } from "react-hot-toast";

const Home = () => {
    // service added
    const { data: newPost } = useSubscription(SERVICE_ADDED, {
        onData: async ({ client: { cache }, data }) => {
            const { getAllServicesUnderLimit } = cache.readQuery({
                query: GET_ALL_SERVICES_UNDER_THE_LIMIT,
                variables: {
                    limit: 3,
                },
            });
            // write the cached
            cache.writeQuery({
                query: GET_ALL_SERVICES_UNDER_THE_LIMIT,
                variables: {
                    limit: 3,
                },
                data: {
                    getAllServicesUnderLimit: [
                        data?.serviceAdded,
                        ...getAllServicesUnderLimit,
                    ],
                },
            });

            console.log(getAllServicesUnderLimit, data);
            toast.success("New Service Added!");
        },
    });

    // service updated
    useSubscription(SERVICE_UPDATED, {
        onData: async ({ client: { cache }, data }) => {
            toast.success("Service Updated!");
        },
    });

    // service removed
    useSubscription(SERVICE_REMOVED, {
        onData: async ({ client: { cache }, data }) => {
            const { getAllServiceByPage } = cache.readQuery(
                GET_ALL_SERVICES_BY_PAGE,
                {
                    variables: {
                        page: 1,
                    },
                }
            );

            console.log(data);

            // removed the service the service
            const filteredServices = getAllServiceByPage.filter(
                (service) => service._id !== data.serviceRemoved._id
            );

            cache.writeQuery({
                query: getAllServiceByPage,
                variables: {
                    page: 1,
                },
                data: {
                    getAllServiceByPage: filteredServices,
                },
            });
        },
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
