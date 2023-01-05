import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_IS_USER } from "./../graphql/queries";

const useUser = () => {
    const [isUser, setIsUser] = useState(false);
    const { loading, data } = useQuery(GET_IS_USER);

    useEffect(() => {
        if (data && data.getUser) {
            setIsUser(data.getUser);
        }
    }, [data]);

    return [isUser, loading];
};

export default useUser;
