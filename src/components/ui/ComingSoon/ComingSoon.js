import React from "react";
import classes from "./ComingSoon.module.css";

const ComingSoon = () => {
    return (
        <div
            style={{ height: "350px" }}
            className="d-flex justify-content-center align-items-center"
        >
            <h2 className={classes.title}>Coming Soon...</h2>
        </div>
    );
};

export default ComingSoon;
