import { Route, Routes } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    ApolloLink,
    concat,
    split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

import { Toaster } from "react-hot-toast";
import Blogs from "./pages/Blogs/Blogs";
import Home from "./pages/Home/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ServiceDetails from "./pages/Services/ServiceDetails/ServiceDetails";
import Services from "./pages/Services/Services";
import Signup from "./pages/Signup/Signup";
import TermCondition from "./pages/TermCondition/TermCondition";
import PrivateRouter from "./routers/PrivateRouter/PrivateRouter";
import SignupV2 from "./pages/Auth/Signup";
import CompleteSignUp from "./pages/Auth/CompleteSignup";
import { useAuth } from "./contexts/AuthProvider/AuthProvider";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import MyReviews from "./pages/Dashboard/User/MyReviews/MyReviews";
import UpdateReview from "./pages/Dashboard/User/MyReviews/UpdateReview/UpdateReview";
import AddService from "./pages/Dashboard/Admin/AddService/AddService";
import SearchResult from "./pages/SearchResult/SearchResult";

function App() {
    const { state } = useAuth();
    const { user } = state;

    const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_API });
    const authMiddleware = new ApolloLink((operation, forward) => {
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                authorization: user ? user.token : null,
            },
        }));

        return forward(operation);
    });
    // 4. concat http and authtoken link
    const httpAuthLink = authMiddleware.concat(httpLink);

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
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetails />} />
                <Route path="/dashboard" element={<DashboardHome />} />
                <Route
                    path="/dashboard/add-service"
                    element={
                        <PrivateRouter>
                            <AddService />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="/dashboard/my-reviews"
                    element={
                        <PrivateRouter>
                            <MyReviews />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="/dashboard/my-reviews/update/:id"
                    element={
                        <PrivateRouter>
                            <UpdateReview />
                        </PrivateRouter>
                    }
                />
                <Route path="/blog" element={<Blogs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/v2/signup" element={<SignupV2 />} />
                <Route path="/completeSignup" element={<CompleteSignUp />} />
                <Route path="/search/:searchQuery" element={<SearchResult />} />
                <Route path="/term-condition" element={<TermCondition />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ApolloProvider>
    );
}

export default App;
