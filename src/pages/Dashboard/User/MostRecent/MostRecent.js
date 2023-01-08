import React from "react";
import Dashboard from "../../../../layout/Dashboard/Dashboard";
import { Helmet } from "react-helmet-async";
import ComingSoon from "../../../../components/ui/ComingSoon/ComingSoon";

const MostRecent = () => {
    return (
        <Dashboard>
            <Helmet>
                <title>Most-Recent</title>
            </Helmet>
            <ComingSoon />
        </Dashboard>
    );
};

export default MostRecent;
