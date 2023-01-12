import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import AOS from "aos";
import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import {
    GET_ALL_SERVICES,
    GET_TOTAL_SERVICES,
} from "../../../../../graphql/queries";
import PaginationBar from "../../../../../components/shared/PaginationBar/PaginationBar";
import ServiceCard from "../../../../../components/shared/ServiceCard/ServiceCard";
import { REMOVED_SERVICE } from "../../../../../graphql/mutations";
import QueryError from "./../../../../../components/shared/Errors/QueryError/QueryError";
import NetworkError from "./../../../../../components/shared/Errors/NetworkError/NetworkError";

const AllServices = () => {
    const [page, setPage] = useState(1);

    const [getAllService, { loading, error, data }] =
        useLazyQuery(GET_ALL_SERVICES);

    const { data: totalServiceData } = useQuery(GET_TOTAL_SERVICES);

    const pages =
        totalServiceData?.totalServices &&
        Math.ceil(totalServiceData?.totalServices / 3);

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init();
    }, []);

    useEffect(() => {
        getAllService({
            variables: {
                page: page,
            },
        });
    }, [page, getAllService]);

    const [removeService, { error: removedServiceError }] = useMutation(
        REMOVED_SERVICE,
        {
            update: (cache, data) => {
                if (data?.data?.removeService?.deletedCount > 0) {
                    Swal.fire({
                        position: "top",
                        icon: "error",
                        title: `Service Deleted Successfully`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            },
        }
    );

    const handleServiceDelete = (id) => {
        removeService({
            variables: {
                serviceId: id,
            },
            refetchQueries: [
                {
                    query: GET_ALL_SERVICES,
                    variables: { page: page },
                },
            ],
        });
    };

    if (error || removedServiceError) {
        if (error?.graphQLErrors.length !== 0) {
            return <QueryError error={error?.graphQLErrors} />;
        } else if (removedServiceError?.graphQLErrors.length !== 0) {
            return <QueryError error={removedServiceError?.graphQLErrors} />;
        } else {
            if (error?.networkError || removedServiceError?.networkError) {
                return (
                    <NetworkError
                        networkError={
                            error?.networkError ||
                            removedServiceError?.networkError
                        }
                    />
                );
            }
        }
    }
    return (
        <>
            <Helmet>
                <title>Admin-Services</title>
            </Helmet>
            <Container className="pt-5 pb-3">
                <Row>
                    {loading ? (
                        <div
                            style={{ height: "400px" }}
                            className="d-flex justify-content-center align-items-center"
                        >
                            <Spinner
                                animation="border"
                                className="spinner-color"
                            />
                        </div>
                    ) : (
                        <>
                            {data?.getAllServiceByPage?.servicesByPagination &&
                            data?.getAllServiceByPage?.servicesByPagination
                                .length > 0 ? (
                                <>
                                    {data?.getAllServiceByPage.servicesByPagination.map(
                                        (service) => (
                                            <ServiceCard
                                                key={service._id}
                                                service={service}
                                                isAdmin
                                                handleServiceDelete={
                                                    handleServiceDelete
                                                }
                                            />
                                        )
                                    )}
                                </>
                            ) : (
                                <h3 className="text-center text-dark">
                                    There is no Services
                                </h3>
                            )}
                        </>
                    )}

                    <PaginationBar
                        page={page}
                        setPage={setPage}
                        pages={pages}
                    />
                </Row>
            </Container>
        </>
    );
};

export default AllServices;
