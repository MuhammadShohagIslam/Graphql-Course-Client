import React from "react";
import { useQuery } from "@apollo/client";
import { Button, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import SectionTitle from "./../../../components/shared/SectionTitle/SectionTitle";
import ServiceCard from "./../../../components/shared/ServiceCard/ServiceCard";
import classes from "./Services.module.css";
import { GET_ALL_SERVICES } from "./../../../graphql/queries";
import DisplayError from './../../DisplayError/DisplayError';

const Services = () => {
    const { loading, error, data } = useQuery(GET_ALL_SERVICES);

    if (error) {
        return (
            <DisplayError
                message={error.message.split(":")[0]}
                statusCode={error.message.split(":")[1].split(" ").slice(-1)}
                isShouldLogin={true}
            />
        );
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
