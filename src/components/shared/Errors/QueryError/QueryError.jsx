import React from "react";
import classes from "./QueryError.module.css";
import { Helmet } from "react-helmet-async";

const QueryError = ({ error }) => {
    let message = "";
    let statusCode = null;
    if (error?.graphQLErrors) {
        error?.graphQLErrors.forEach(({ message }) => {
            message = message?.split(":")[0];
            statusCode = message?.split(":")[1]?.split(" ")?.slice(-1);
        });
    }
    return (
        <>
            <Helmet>
                <title>Graphql-Error</title>
            </Helmet>
            <div className={classes.notFoundPageWrapper}>
                <h1 className={classes.fourOrFourTitle}>
                    {statusCode && statusCode}
                </h1>
                <h2 className={classes.fourOrFourInfo}>{message}</h2>
            </div>
        </>
    );
};

export default QueryError;
