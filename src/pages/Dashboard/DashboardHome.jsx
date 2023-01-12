import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@apollo/client";
import DisplayError from "./../DisplayError/DisplayError";
import { GET_CURRENT_USER } from './../../graphql/queries';

const DashboardHome = () => {
    const { data, error } = useQuery(GET_CURRENT_USER);

    if (error) {
        return (
            <DisplayError
                message={error.message.split(":")[0]}
                statusCode={error.message.split(":")[1].split(" ").slice(-1)}
            />
        );
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
                <h2
                    style={{
                        color: "000",
                        fontSize: "40px",
                        fontWeight: "700",
                    }}
                >
                    Welcome To The
                </h2>
                <h2
                    style={{
                        color: "000",
                        fontSize: "40px",
                        fontWeight: "700",
                    }}
                >
                    '''
                    {data?.currentUser && data?.currentUser.role === "admin"
                        ? "Admin"
                        : "User"}
                    '''
                </h2>
                <h2>DashBoard</h2>
            </div>
        </>
    );
};

export default DashboardHome;
