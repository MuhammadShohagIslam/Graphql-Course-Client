import React from "react";
import { Helmet } from "react-helmet-async";
import ComingSoon from "../../../../components/ui/ComingSoon/ComingSoon";

const MostRecent = () => {
    return (
        <>
            <Helmet>
                <title>Most-Recent</title>
            </Helmet>
            <ComingSoon />
        </>
    );
};

export default MostRecent;
