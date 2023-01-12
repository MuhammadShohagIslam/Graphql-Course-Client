import React from "react";
import { Helmet } from "react-helmet-async";
import classes from "./NetworkError.module.css";

const NetworkError = ({ networkError }) => {
    let message = "";
    if (networkError) {
        message = networkError.message;
    }
    console.log({networkError});
    return (
        <>
            <Helmet>
                <title>Network-Error</title>
            </Helmet>
            <div className={classes.notFoundPageWrapper}>
                <h1 className={classes.fourOrFourTitle}>502</h1>
                <h2 className={classes.fourOrFourInfo}>{message}</h2>
            </div>
        </>
    );
};

export default NetworkError;
