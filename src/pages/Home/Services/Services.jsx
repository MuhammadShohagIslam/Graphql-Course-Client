import React from "react";
import { useQuery } from "@apollo/client";
import { Button, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import SectionTitle from "./../../../components/shared/SectionTitle/SectionTitle";
import ServiceCard from "./../../../components/shared/ServiceCard/ServiceCard";
import classes from "./Services.module.css";
import { GET_ALL_SERVICES } from "./../../../graphql/queries";
import QueryError from "./../../../components/shared/Errors/QueryError/QueryError";
import NetworkError from "./../../../components/shared/Errors/NetworkError/NetworkError";

const Services = () => {
    const { loading, error, data } = useQuery(GET_ALL_SERVICES);

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
            <Container className="py-5">
                <SectionTitle
                    title="Services"
                    info="Check my core service below"
                />
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
                                    {data.getAllService
                                        .slice(0, 3)
                                        .map((service) => (
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
                            <div className="text-center">
                                <Link to="/services">
                                    <Button
                                        className={`${classes.seeAllButton} btn`}
                                        size="lg"
                                    >
                                        See All
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default Services;
