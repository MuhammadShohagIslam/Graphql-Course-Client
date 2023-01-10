import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import classes from "./DisplayError.module.css";
import { TbError404 } from "react-icons/tb";
import { useAuth } from '../../contexts/AuthProvider/AuthProvider';

const DisplayError = ({message}) => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    return (
        <>
            <Helmet>
                <title>Error</title>
            </Helmet>
            <div className={classes.notFoundPageWrapper}>
                <h1 className={classes.fourOrFourTitle}>
                    <TbError404 />
                </h1>
                <h2 className={classes.fourOrFourInfo}>
                   {message}
                </h2>
                <h2 className={classes.fourOrFourInfo}>
                    Please{" "}
                    <span
                        onClick={handleLogOut}
                        className={classes.fourOrFourLink}
                    >
                        LogOut
                    </span>{" "}
                    and{" "}
                    <Link to="/login" className={classes.fourOrFourLink}>
                        Login
                    </Link>
                    {" "}Back In
                </h2>
            </div>
        </>
    );
};

export default DisplayError;
