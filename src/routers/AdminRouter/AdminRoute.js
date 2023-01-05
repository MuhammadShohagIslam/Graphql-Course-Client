import React from "react";
import { useAuth } from "./../context/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "./../hooks/useAdmin";
import { Spinner } from "react-bootstrap";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return (
            <div
                style={{ height: "400px" }}
                className="d-flex justify-content-center align-items-center"
            >
                <Spinner animation="border" className="spinner-color" />
            </div>
        );
    }
    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace={true} />;
};

export default AdminRoute;
