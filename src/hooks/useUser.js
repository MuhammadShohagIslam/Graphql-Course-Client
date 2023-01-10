import { useQuery } from "@apollo/client";
import { GET_IS_USER } from "./../graphql/queries";

const useUser = () => {
    const { loading: isUserLoading, data } = useQuery(GET_IS_USER);
    return [data?.getUser, isUserLoading];
};

export default useUser;
