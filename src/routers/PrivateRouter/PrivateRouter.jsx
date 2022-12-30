import React from "react";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div
                style={{ height: "400px" }}
                className="d-flex justify-content-center align-items-center"
            >
                <Spinner animation="border" className="spinner-color" />
            </div>
        );
    }
    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace={true}/>;
};

export default PrivateRouter;
