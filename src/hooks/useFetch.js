import { useEffect, useState } from "react";

const useFetch = (uri, isToken = false, method) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiFetch = async () => {
            try {
                setLoading(true);
                let response = await fetch(uri, {
                    method: method || "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        apiFetch();
    }, [uri, isToken, method]);

    return {
        data,
        loading,
    };
};

export default useFetch;
