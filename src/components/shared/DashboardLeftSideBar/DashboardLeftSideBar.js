import React from "react";
import { Nav, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ImBlogger } from "react-icons/im";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GiTimeSynchronization } from "react-icons/gi";
import classes from "./DashboardLeftSideBar.module.css";
import { useAuth } from "../../../contexts/AuthProvider/AuthProvider";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "./../../../graphql/queries";

const DashboardLeftSideBar = () => {
    const { user } = useAuth();
    const { data } = useQuery(GET_CURRENT_USER);
    return (
        <ul className={`${classes.leftSideListWrapper} pt-4`}>
            <li className={classes.leftSideTopListItemWrapper}>
                {user?.photoURL || data?.data?.currentUser.image.url ? (
                    <Image
                        width={100}
                        height={100}
                        className={classes.commentImg}
                        roundedCircle
                        src={`${
                            data?.data?.currentUser?.image.url || user?.photoURL
                        }`}
                    />
                ) : (
                    <FaUserAlt className="text-white fs-1" />
                )}

                <h5 className="text-center text-white mt-2">
                    {user?.displayName}
                </h5>
            </li>
            <li className="mb-3">
                <LinkContainer
                    className={classes.leftSideListItemWrapper}
                    to="/dashboard/profile"
                >
                    <Nav.Link className={classes.navLink}>
                        <CgProfile className={classes.leftSideProfileIcon} />
                        Profile
                    </Nav.Link>
                </LinkContainer>
            </li>
            {data?.currentUser && data?.currentUser.role === "admin" && (
                <>
                    <li className="mb-3">
                        <LinkContainer
                            className={classes.leftSideListItemWrapper}
                            to="/dashboard/admin/all-services"
                        >
                            <Nav.Link className={classes.navLink}>
                                <ImBlogger
                                    className={classes.leftSideProfileIcon}
                                />
                                All Services
                            </Nav.Link>
                        </LinkContainer>
                    </li>
                    <li className="mb-3">
                        <LinkContainer
                            className={classes.leftSideListItemWrapper}
                            to="/dashboard/admin/add-service"
                        >
                            <Nav.Link className={classes.navLink}>
                                <ImBlogger
                                    className={classes.leftSideProfileIcon}
                                />
                                Add Service
                            </Nav.Link>
                        </LinkContainer>
                    </li>
                </>
            )}
            {data?.currentUser && data?.currentUser.role === "user" && (
                <>
                    <li className="mb-3">
                        <LinkContainer
                            className={classes.leftSideListItemWrapper}
                            to="/dashboard/user/my-reviews"
                        >
                            <Nav.Link className={classes.navLink}>
                                <HiOutlineUserGroup
                                    className={classes.leftSideProfileIcon}
                                />
                                My Reviews
                            </Nav.Link>
                        </LinkContainer>
                    </li>
                    <li className="mb-3">
                        <LinkContainer
                            className={classes.leftSideListItemWrapper}
                            to="/dashboard/user/most-recent"
                        >
                            <Nav.Link className={classes.navLink}>
                                <GiTimeSynchronization
                                    className={classes.leftSideProfileIcon}
                                />
                                Most Recent
                            </Nav.Link>
                        </LinkContainer>
                    </li>
                </>
            )}
        </ul>
    );
};

export default DashboardLeftSideBar;
