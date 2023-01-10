import React from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from './../../contexts/AuthProvider/AuthProvider';
import useAdmin from './../../hooks/useAdmin';


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    console.log(isAdmin, isAdminLoading, "admin router");

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
