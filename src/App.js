import { useQuery, gql } from "@apollo/client";

const GET_ALL_POSTS = gql`
    query posts {
        posts {
            title
            description
        }
    }
`;

function App() {
    const { loading, error, data } = useQuery(GET_ALL_POSTS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return <>{JSON.stringify(data.posts)}</>;
}

export default App;
