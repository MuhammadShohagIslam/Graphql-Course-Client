import React, { useEffect } from "react";
import AboutMe from "../AboutMe/AboutMe";
import Contact from "../Contact/Contact";
import Services from "../Services/Services";
import Jumbotron from "./../../../components/shared/Jumbotron/Jumbotron";
import { Helmet } from "react-helmet-async";
import Main from "./../../../layout/Main/Main";
import { useSubscription,useQuery } from "@apollo/client";
import {
    SERVICE_ADDED,
    SERVICE_UPDATED,
    SERVICE_REMOVED,
} from "./../../../graphql/subscriptions";
import { GET_ALL_SERVICES_UNDER_THE_LIMIT, GET_ALL_SERVICES_BY_PAGE } from "./../../../graphql/queries";
import { toast } from "react-hot-toast";

const Home = () => {
    const { loading, error, data, subscribeToMore } = useQuery(GET_ALL_SERVICES_UNDER_THE_LIMIT, {
        variables: { limit: 3 },
    });
    // service added
    const { data: newPost } = useSubscription(SERVICE_ADDED, {
        onData: ({ client, data }) => {
            const { getAllServicesUnderLimit } = client.readQuery({
                query: GET_ALL_SERVICES_UNDER_THE_LIMIT,
                variables: {
                    limit: 3,
                },
            });
            // write the cached
            client.writeQuery({
                query: GET_ALL_SERVICES_UNDER_THE_LIMIT,
                data: {
                    getAllServicesUnderLimit: [
                        data.data.serviceAdded,
                        ...getAllServicesUnderLimit,
                    ],
                },
                variables: {
                    limit: 3,
                },
            });
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
        onData: async ({
            client, data 
        }) => {
            // console.log(data)
            // readQuery from cache
            const { getAllServicesUnderLimit } = client.readQuery({
                query: GET_ALL_SERVICES_UNDER_THE_LIMIT,
                variables: {
                    limit: 3,
                },
            });
            console.log(getAllServicesUnderLimit,client);

            let filteredService = getAllServicesUnderLimit.filter(
                (p) => p._id !== data.data.serviceRemoved._id
            );

           // write the cached
           client.writeQuery({
            query: GET_ALL_SERVICES_UNDER_THE_LIMIT,
            data: {
                getAllServicesUnderLimit: filteredService,
            },
            variables: {
                limit: 3,
            },
        });
            // show toast notification
            toast.error("Service deleted!");
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
