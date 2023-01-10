import React from "react";
import { useAuth } from './../../contexts/AuthProvider/AuthProvider';
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import useUser from './../../hooks/useUser';

const UserRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isUser, isUserLoading] = useUser();
    const location = useLocation();
    console.log(isUser, "isUser")

    if (loading || isUserLoading) {
        return (
            <div
                style={{ height: "400px" }}
                className="d-flex justify-content-center align-items-center"
            >
                <Spinner animation="border" className="spinner-color" />
            </div>
        );
    }
    if (user && isUser) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace={true} />;
};

export default UserRoute;
