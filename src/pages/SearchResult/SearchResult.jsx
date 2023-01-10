import { useQuery } from "@apollo/client";
import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { GET_SEARCH_DATA } from "../../graphql/queries";
import ServiceCard from "../../components/shared/ServiceCard/ServiceCard";

const SearchResult = () => {
    const { searchQuery } = useParams();
    const { loading, error, data } = useQuery(GET_SEARCH_DATA, {
        variables: { search: searchQuery },
    });
    return (
        <>
            <Helmet>
                <title>Search Result</title>
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
                            {data?.getSearchResult &&
                            data?.getSearchResult.length > 0 ? (
                                <>
                                    {data?.getSearchResult.map((service) => (
                                        <ServiceCard
                                            key={service._id}
                                            service={service}
                                        />
                                    ))}
                                </>
                            ) : (
                                <h3 className="text-center text-dark">
                                    There is no result
                                </h3>
                            )}
                        </>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default SearchResult;
