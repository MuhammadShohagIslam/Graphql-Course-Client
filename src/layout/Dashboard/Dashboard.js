import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import classes from "./Dashboard.module.css";
import Footer from "../../components/shared/Footer/Footer";
import ProfileLeftSideBar from "../../components/shared/ProfileLeftSideBar/ProfileLeftSideBar";
import MediaNavBar from './../../components/shared/NavBar/MediaNavBar/MediaNavBar';

const ProfileLayout = ({ children }) => {
    const [openLeftSideBar, setOpenLeftSideBar] = useState(false);

    const handleOpenMenu = () => {
        setOpenLeftSideBar(!openLeftSideBar);
    };

    return (
        <>
            <header>
                <MediaNavBar />
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
                    {openLeftSideBar && <ProfileLeftSideBar />}
                </section>
            </header>
            <main className={classes.profileLayout}>
                <div
                    className="d-none d-md-none d-lg-block"
                    style={{ height: "100%" }}
                >
                    <ProfileLeftSideBar />
                </div>
                <div className="pt-4">{children}</div>
            </main>
            <Footer />
        </>
    );
};

export default ProfileLayout;
