import { useLazyQuery } from "@apollo/client";
import AOS from "aos";
import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import ServiceCard from "../../components/shared/ServiceCard/ServiceCard";
import { GET_ALL_SERVICES_BY_PAGE } from "../../graphql/queries";
import Main from "../../layout/Main";
import PaginationBar from "./../../components/shared/PaginationBar/PaginationBar";

const Services = () => {
    const [page, setPage] = useState(1);

    const [getAllServiceByPage, { loading, error, data }] = useLazyQuery(
        GET_ALL_SERVICES_BY_PAGE
    );
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

    if (error) return `Error! ${error.message}`;

    return (
        <Main>
            <Helmet>
                <title>Services</title>
            </Helmet>
            <Container className="pt-5 pb-3">
                {JSON.stringify(data?.getAllServiceByPage?.totalService)}
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
        </Main>
    );
};

export default Services;
