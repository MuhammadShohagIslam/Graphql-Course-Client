import { useState, useEffect } from "react";
import { GET_IS_ADMIN_USER } from './../graphql/queries';
import { useQuery } from '@apollo/client';

const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { loading, data } = useQuery(GET_IS_ADMIN_USER);

    useEffect(() => {
        if (data && data.getAdminUser) {
            setIsAdmin(data.getAdminUser);
        }
    }, [data]);

    return [isAdmin, loading];
};

export default useAdmin;
