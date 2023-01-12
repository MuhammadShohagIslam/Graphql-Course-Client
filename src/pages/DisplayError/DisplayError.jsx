import React from "react";
import {
    Link,
    useNavigate,
    useRouteError,
    isRouteErrorResponse,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import classes from "./DisplayError.module.css";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";

const DisplayError = ({ message, statusCode, isShouldLogin = false }) => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    let error = useRouteError();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    const errorObj = {
        status: null,
        message: "",
    };
    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            errorObj.status = error.status;
            errorObj.message = error.statusText;
        }

        if (error.status === 401) {
            errorObj.status = error.status;
            errorObj.message = error.statusText;
        }

        if (error.status === 503) {
            errorObj.status = error.status;
            errorObj.message = error.statusText;
        }

        if (error.status === 418) {
            errorObj.status = error.status;
            errorObj.message = error.statusText;
        }
    }
    console.log(errorObj);
    return (
        <>
            <Helmet>
                <title>Error</title>
            </Helmet>
            <div className={classes.notFoundPageWrapper}>
                <h1 className={classes.fourOrFourTitle}>
                    {statusCode || errorObj?.status}
                </h1>
                <h2 className={classes.fourOrFourInfo}>
                    {message || errorObj?.message}
                </h2>
                {!isShouldLogin && (
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
                        </Link>{" "}
                        Back In
                    </h2>
                )}
            </div>
        </>
    );
};

export default DisplayError;
