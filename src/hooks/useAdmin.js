import { GET_IS_ADMIN_USER } from "./../graphql/queries";
// import {useNavigate} from 'react-router-dom'
import { useQuery } from "@apollo/client";
// import { useAuth } from './../contexts/AuthProvider/AuthProvider';

const useAdmin = () => {
    const { loading, data, error } = useQuery(GET_IS_ADMIN_USER);
  
    console.log(data?.getAdminUser, "user");
    return [data?.getAdminUser, loading];
};

export default useAdmin;
