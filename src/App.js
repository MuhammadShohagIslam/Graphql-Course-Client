import { RouterProvider } from "react-router-dom";
import router from "./routers/Routers/Routers";
import { setContext } from "@apollo/client/link/context";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    split,
    ApolloLink,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./contexts/AuthProvider/AuthProvider";

function App() {
    const { state } = useAuth();
    const { user } = state;
    const httpLink = new createHttpLink({
        uri: process.env.REACT_APP_GRAPHQL_API,
        withCredentials: false,
    });
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: user ? user.token : "",
            },
        };
    });

    const httpAuthLink = ApolloLink.from([authLink, httpLink]);

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
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "network-only",
                errorPolicy: "all",
            },
        },
        fetchOptions: {
            mode: "no-cors",
        },
        connectToDevTools: true,
    });

    return (
        <ApolloProvider client={client}>
            <Toaster position="top-right" reverseOrder={false} />
            <RouterProvider router={router}></RouterProvider>
        </ApolloProvider>
    );
}

export default App;
