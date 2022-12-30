import React from "react";
import classes from "./SectionTitle.module.css";

const SectionTitle = ({ title, info }) => {
    return (
        <div className={classes.sectionWrapper}>
            <h2 className={classes.sectionTitle}>{title}</h2>
            {info && <p className={classes.sectionInfo}>{info}</p>}
        </div>
    );
};

export default SectionTitle;
