import React, { useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@apollo/client";
import { GET_REVIEWS_BY_SPECIFIC_USER } from "../../../../graphql/queries";
import { REMOVED_REVIEW } from "../../../../graphql/mutations";
import Dashboard from './../../../../layout/Dashboard/Dashboard';
import ReviewTable from './../../../../components/shared/ReviewTable/ReviewTable';
import { useAuth } from './../../../../contexts/AuthProvider/AuthProvider';

const MyReviews = () => {
    const { state } = useAuth();
    const { user } = state;

    const { loading, error, data, refetch } = useQuery(
        GET_REVIEWS_BY_SPECIFIC_USER,
        {
            variables: { email: user?.email, name: user?.fullName },
        }
    );

    useEffect(() => {
        refetch();
    }, [refetch]);

    const [removeReview] = useMutation(REMOVED_REVIEW, {
        update(cache, data) {
            if (data?.data?.removeReview?.deletedCount > 0) {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `Review Deleted Successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        },
    });

    const handleReviewDelete = async (e, id, serviceName) => {
        removeReview({
            variables: {
                reviewId: id,
            },
            refetchQueries: [
                {
                    query: GET_REVIEWS_BY_SPECIFIC_USER,
                    variables: { email: user?.email, name: user?.fullName },
                },
            ],
        });
    };
    if (error) return `Error! ${error}`;

    return (
        <Dashboard>
            <Helmet>
                <title>MyReviews</title>
            </Helmet>
            <Container className="mt-4">
                <h3 className="text-center py-3">
                    '''{data?.getReviewBySpecificUser.length} Reviews On Service
                    By {user?.fullName}'''
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
        </Dashboard>
    );
};

export default MyReviews;
