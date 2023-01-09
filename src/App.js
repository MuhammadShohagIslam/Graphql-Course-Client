import { Route, Routes } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

import { Toaster } from "react-hot-toast";
import Blogs from "./pages/Blogs/Blogs";
import Home from "./pages/Home/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ServiceDetails from "./pages/Services/ServiceDetails/ServiceDetails";
import Services from "./pages/Services/Services";
import TermCondition from "./pages/TermCondition/TermCondition";
import PrivateRouter from "./routers/PrivateRouter/PrivateRouter";
import CompleteRegister from "./pages/Auth/CompleteRegister";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import MyReviews from "./pages/Dashboard/User/MyReviews/MyReviews";
import UpdateReview from "./pages/Dashboard/User/MyReviews/UpdateReview/UpdateReview";
import AddService from "./pages/Dashboard/Admin/Services/AddService/AddService";
import SearchResult from "./pages/SearchResult/SearchResult";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { useAuth } from "./contexts/AuthProvider/AuthProvider";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import UpdatePassword from "./pages/Auth/UpdatePassword";
import Profile from "./pages/Dashboard/User/Profile/Profile";
import AllServices from "./pages/Dashboard/Admin/Services/AllServices/AllServices";
import UpdateService from "./pages/Dashboard/Admin/Services/UpdateService/UpdateService";
import MostRecent from "./pages/Dashboard/User/MostRecent/MostRecent";

function App() {
    const { state } = useAuth();
    const { user } = state;

    const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_API });
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: user ? user.token : "",
            },
        };
    });

    // 4. concat http and authtoken link
    const httpAuthLink = authLink.concat(httpLink);

    const wsLink = new GraphQLWsLink(
        createClient({
            url: process.env.REACT_APP_WS_GRAPHQL_API,
            connectionParams: {
                authorization: user ? user.token : null,
            },
        })
    );

    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
            );
        },
        wsLink,
        httpAuthLink
    );

    const client = new ApolloClient({
        uri: process.env.REACT_APP_GRAPHQL_API,
        link: splitLink,
        cache: new InMemoryCache({
            typePolicies: {
                GetAllReview: {
                    merge: true,
                },
            },
        }),
    });

    return (
        <ApolloProvider client={client}>
            <Toaster position="top-right" reverseOrder={false} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetails />} />
                <Route path="/dashboard" element={<DashboardHome />} />
                <Route
                    path="/dashboard/admin/all-services"
                    element={
                        <PrivateRouter>
                            <AllServices />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="/dashboard/admin/add-service"
                    element={
                        <PrivateRouter>
                            <AddService />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="/dashboard/admin/edit-service/:serviceId"
                    element={
                        <PrivateRouter>
                            <UpdateService />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="/dashboard/user/my-reviews"
                    element={
                        <PrivateRouter>
                            <MyReviews />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="/dashboard/user/my-reviews/update/:id"
                    element={
                        <PrivateRouter>
                            <UpdateReview />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="/dashboard/profile"
                    element={
                        <PrivateRouter>
                            <Profile />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="/dashboard/user/most-recent"
                    element={
                        <PrivateRouter>
                            <MostRecent />
                        </PrivateRouter>
                    }
                />
                <Route path="/blog" element={<Blogs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/complete-registration"
                    element={<CompleteRegister />}
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                <Route path="/search/:searchQuery" element={<SearchResult />} />
                <Route path="/term-condition" element={<TermCondition />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ApolloProvider>
    );
}

export default App;
