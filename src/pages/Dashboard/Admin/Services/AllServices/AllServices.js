import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import AOS from "aos";
import { Container, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import PaginationBar from "./../../../../../components/shared/PaginationBar/PaginationBar";
import Dashboard from "../../../../../layout/Dashboard/Dashboard";
import {
    GET_ALL_SERVICES_BY_PAGE,
    GET_ALL_SERVICES_UNDER_THE_LIMIT,
} from "../../../../../graphql/queries";
import ServiceCard from "./../../../../../components/shared/ServiceCard/ServiceCard";
import { REMOVED_SERVICE } from "./../../../../../graphql/mutations";


const AllServices = () => {
    const [page, setPage] = useState(1);

    const [getAllServiceByPage, { loading, error, data }] =
        useLazyQuery(GET_ALL_SERVICES_BY_PAGE);
    const pages =
        data?.getAllServiceByPage?.totalService &&
        Math.ceil(data?.getAllServiceByPage?.totalService / 3);

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init();
    }, []);

    useEffect(() => {
        getAllServiceByPage({
            variables: {
                page: page,
            },
        });
    }, [page, getAllServiceByPage]);

    const [removeService] = useMutation(REMOVED_SERVICE, {
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
    });

    const handleServiceDelete = (id) => {
        removeService({
            variables: {
                serviceId: id,
            },
            refetchQueries: [
                {
                    query: GET_ALL_SERVICES_BY_PAGE,
                    variables: { page: page },
                },
            ],
        });
    };

    if (error) return `Error! ${error.message}`;
    return (
        <Dashboard>
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
        </Dashboard>
    );
};

export default AllServices;
