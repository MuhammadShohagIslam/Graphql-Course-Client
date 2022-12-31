import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Button, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import SectionTitle from "./../../../components/shared/SectionTitle/SectionTitle";
import ServiceCard from "./../../../components/shared/ServiceCard/ServiceCard";
import classes from "./Services.module.css";

const GET_ALL_SERVICES_UNDER_LIMIT = gql`
    query GetAllServices($limit: Int) {
        getAllServices(limit: $limit) {
            _id
            description
            img
            name
            price
        }
    }
`;

const Services = () => {
    const { loading, error, data } = useQuery(GET_ALL_SERVICES_UNDER_LIMIT, {
        variables: { limit: 3 },
    });

    if (error) return `Error! ${error}`;

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
                            {data?.getAllServices &&
                            data?.getAllServices.length > 0 ? (
                                <>
                                    {data.getAllServices.map((service) => (
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
