import React from "react";
import { useAuth } from "./../context/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useBuyer from "./../hooks/useBuyer";
import { Spinner } from "react-bootstrap";

const UserRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isBuyer, isBuyerLoading] = useBuyer();

    const location = useLocation();

    if (loading || isBuyerLoading) {
        return (
            <div
                style={{ height: "400px" }}
                className="d-flex justify-content-center align-items-center"
            >
                <Spinner animation="border" className="spinner-color" />
            </div>
        );
    }
    if (user && isBuyer) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace={true} />;
};

export default UserRoute;
