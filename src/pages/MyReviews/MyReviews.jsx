import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import ReviewTable from "../../components/shared/ReviewTable/ReviewTable";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import Main from "../../layout/Main";
import { gql, useQuery } from "@apollo/client";

const GET_REVIEWS_BY_SPECIFIC_USER = gql`
    query GetReviewBySpecificUser($email: String!, $name: String) {
        getReviewBySpecificUser(email: $email, name: $name) {
            _id
            _service
            comment
            createdAt
            email
            img
            name
            serviceName
            star
        }
    }
`;

const MyReviews = () => {
    const [reviewsBySpecificUser, setReviewsBySpecificUser] = useState([]);
    const { state } = useAuth();
    const { user } = state;

    const { loading, error, data } = useQuery(GET_REVIEWS_BY_SPECIFIC_USER, {
        variables: { email: user?.email, name: user?.name },
    });

    const handleReviewDelete = async (e, id, serviceName) => {
        console.log(id);
        const response = await axios.delete(
            `https://server-smoky-ten.vercel.app/reviews/${id}`
        );
        const data = await response.data;
        if (data?.deletedCount > 0) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: `Review ${serviceName} Deleted Successfully`,
                showConfirmButton: false,
                timer: 1500,
            });
            const remainingReviews = reviewsBySpecificUser.filter(
                (review) => review._id !== id
            );
            setReviewsBySpecificUser([...remainingReviews]);
        }
    };
    if (error) return `Error! ${error}`;

    return (
        <Main>
            <Helmet>
                <title>MyReviews</title>
            </Helmet>
            <Container className="mt-4">
                <h3 className="text-center py-3">
                    '''Reviews Service By {user?.displayName}'''
                </h3>
                <Row className="m-0">
                    {loading ? (
                        <div
                            style={{ height: "300px" }}
                            className="d-flex justify-content-center align-items-center"
                        >
                            <Spinner
                                animation="border"
                                className="spinner-color"
                            />
                        </div>
                    ) : (
                        <>
                            {data?.getReviewBySpecificUser &&
                            data?.getReviewBySpecificUser?.length > 0 ? (
                                <ReviewTable
                                    reviewsBySpecificUser={
                                        data.getReviewBySpecificUser
                                    }
                                    handleReviewDelete={handleReviewDelete}
                                />
                            ) : (
                                <h3 className="text-center text-dark">
                                    No reviews were added
                                </h3>
                            )}
                        </>
                    )}
                </Row>
            </Container>
        </Main>
    );
};

export default MyReviews;
