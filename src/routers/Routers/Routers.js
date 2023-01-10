import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import Home from "./../../pages/Home/Home/Home";
import Blogs from "./../../pages/Blogs/Blogs";
import Login from "./../../pages/Auth/Login";
import Register from "./../../pages/Auth/Register";
import PrivateRouter from "./../PrivateRouter/PrivateRouter";
import Dashboard from "./../../layout/Dashboard/Dashboard";
import DashboardHome from "../../pages/Dashboard/DashboardHome";
import Services from "./../../pages/Services/Services";
import AllServices from "./../../pages/Dashboard/Admin/Services/AllServices/AllServices";
import AdminRoute from "./../AdminRouter/AdminRoute";
import AddService from "./../../pages/Dashboard/Admin/Services/AddService/AddService";
import UpdateService from "./../../pages/Dashboard/Admin/Services/UpdateService/UpdateService";
import MyReviews from "./../../pages/Dashboard/User/MyReviews/MyReviews";
import UserRoute from "../UserRouter/UserRoute";
import UpdateReview from "./../../pages/Dashboard/User/MyReviews/UpdateReview/UpdateReview";
import Profile from "./../../pages/Dashboard/User/Profile/Profile";
import MostRecent from './../../pages/Dashboard/User/MostRecent/MostRecent';
import ServiceDetails from './../../pages/Services/ServiceDetails/ServiceDetails';
import CompleteRegister from './../../pages/Auth/CompleteRegister';
import ForgotPassword from './../../pages/Auth/ForgotPassword';
import UpdatePassword from './../../pages/Auth/UpdatePassword';
import SearchResult from './../../pages/SearchResult/SearchResult';
import TermCondition from './../../pages/TermCondition/TermCondition';
import PrivacyPolicy from './../../pages/PrivacyPolicy/PrivacyPolicy';
import NotFound from './../../pages/NotFound/NotFound';
import DisplayError from './../../pages/DisplayError/DisplayError';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/blog",
                element: <Blogs />,
            },
            {
                path: "/services",
                element: <Services />,
            },
            {
                path: "/services/:id",
                element: <ServiceDetails />,
            },
            {
                path: "/search/:searchQuery",
                element: <SearchResult />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "/complete-registration",
                element: <CompleteRegister />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "/update-password",
                element: <UpdatePassword />,
            },
            {
                path: "/term-condition",
                element: <TermCondition />,
            },
            {
                path: "/privacy-policy",
                element: <PrivacyPolicy />,
            }
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRouter>
                <Dashboard></Dashboard>
            </PrivateRouter>
        ),
        errorElement: <DisplayError />,
        children: [
            {
                path: "/dashboard",
                element: <DashboardHome />,
            },
            {
                path: "/dashboard/admin/all-services",
                element: (
                    <AdminRoute>
                        <AllServices />
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/admin/add-service",
                element: (
                    <AdminRoute>
                        <AddService />
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/admin/edit-service/:serviceId",
                element: (
                    <AdminRoute>
                        <UpdateService />
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/user/my-reviews",
                element: (
                    <UserRoute>
                        <MyReviews />
                    </UserRoute>
                ),
            },
            {
                path: "/dashboard/user/my-reviews/update/:id",
                element: (
                    <UserRoute>
                        <UpdateReview />
                    </UserRoute>
                ),
            },
            {
                path: "/dashboard/profile",
                element: <Profile />,
            },
            {
                path: "/dashboard/user/most-recent",
                element: (
                    <UserRoute>
                        <MostRecent />
                    </UserRoute>
                ),
            },
        ],
    },
]);

export default router;
