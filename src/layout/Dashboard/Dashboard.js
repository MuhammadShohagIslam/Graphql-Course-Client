import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import classes from "./Dashboard.module.css";
import Footer from "../../components/shared/Footer/Footer";
import DashboardLeftSideBar from "./../../components/shared/DashboardLeftSideBar/DashboardLeftSideBar";
import NavBar from "./../../components/shared/NavBar/NavBar";

const Dashboard = () => {
    const [openLeftSideBar, setOpenLeftSideBar] = useState(false);

    const handleOpenMenu = () => {
        setOpenLeftSideBar(!openLeftSideBar);
    };

    return (
        <>
            <header>
                <NavBar />
                <section className="d-block d-md-block d-lg-none">
                    <div className={classes.bottomSideBarShowWrapper}>
                        <span
                            className={classes.previewPostCrossIcon}
                            onClick={handleOpenMenu}
                        >
                            {openLeftSideBar ? (
                                "X"
                            ) : (
                                <AiOutlineBars className="mb-1" />
                            )}
                        </span>
                    </div>
                    {openLeftSideBar && <DashboardLeftSideBar />}
                </section>
            </header>
            <main className={classes.dashboardLayout}>
                <div
                    className="d-none d-md-none d-lg-block"
                    style={{ height: "100%" }}
                >
                    <DashboardLeftSideBar />
                </div>
                <div className="pt-4">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Dashboard;
