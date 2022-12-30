import AOS from 'aos';
import React, { useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import ServiceCard from "../../components/shared/ServiceCard/ServiceCard";
import Main from "../../layout/Main";
import useFetch from "./../../hooks/useFetch";

const Services = () => {
    const { data, loading } = useFetch("https://server-smoky-ten.vercel.app/services");

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init();
    }, []);

    return (
        <Main>
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
                            {data.length > 0 ? (
                                <>
                                    {data.map((service) => (
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
                </Row>
            </Container>
        </Main>
    );
};

export default Services;
