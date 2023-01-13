/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery, useQuery } from "@apollo/client";
import AOS from "aos";
import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import ServiceCard from "../../components/shared/ServiceCard/ServiceCard";
import { GET_ALL_SERVICES, GET_TOTAL_SERVICES } from "../../graphql/queries";
import PaginationBar from "../../components/shared/PaginationBar/PaginationBar";
import NetworkError from "../../components/shared/Errors/NetworkError/NetworkError";
import QueryError from "./../../components/shared/Errors/QueryError/QueryError";

const Services = () => {
    const [page, setPage] = useState(1);

    const [getAllService, { loading, data, error }] =
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
    }, [page]);

    if (error) {
        if (error?.graphQLErrors.length !== 0) {
            return <QueryError error={error?.graphQLErrors} />;
        }
        if (error?.networkError) {
            return <NetworkError networkError={error?.networkError} />;
        }
    }

    return (
        <>
            <Helmet>
                <title>Services</title>
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
                            {data?.getAllService &&
                            data?.getAllService.length > 0 ? (
                                <>
                                    {data?.getAllService.map((service) => (
                                        <ServiceCard
                                            key={service._id}
                                            service={service}
                                        />
                                    ))}
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

export default Services;
