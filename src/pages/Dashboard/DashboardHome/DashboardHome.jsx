import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../../graphql/queries";
import QueryError from "../../../components/shared/Errors/QueryError/QueryError";
import NetworkError from "../../../components/shared/Errors/NetworkError/NetworkError";
import classes from "./DashboardHome.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../../contexts/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";

const DashboardHome = () => {
    const { data, error } = useQuery(GET_CURRENT_USER);

    const { logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate();
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    if (error) {
        if (error?.graphQLErrors) {
            for (let err of error?.graphQLErrors) {
                if (err.extensions.code === "UNAUTHENTICATED") {
                    handleLogOut();
                    toast.error(
                        "Unauthenticated User, Please Login or Register!"
                    );
                    return;
                }
                if (err.extensions.code === "FORBIDDEN") {
                    handleLogOut();
                    return;
                }
            }

            return <QueryError error={error?.graphQLErrors} />;
        }
        if (error?.networkError) {
            return <NetworkError networkError={error?.networkError} />;
        }
    }
    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <div
                style={{ height: "350px" }}
                className="d-flex justify-content-center align-items-center"
            >
                <h2 className={classes.title}>Welcome To The</h2>
                <h2 className={classes.title}>
                    '''
                    {data?.currentUser && data?.currentUser.role === "admin"
                        ? "Admin"
                        : "User"}
                    '''
                </h2>
                <h2 className={classes.title}>DashBoard</h2>
            </div>
        </>
    );
};

export default DashboardHome;
