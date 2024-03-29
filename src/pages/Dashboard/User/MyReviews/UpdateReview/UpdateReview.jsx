/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Swal from "sweetalert2";
import { REVIEW_UPDATED } from "../../../../../graphql/mutations";
import { GET_SINGLE_REVIEW } from "../../../../../graphql/queries";
import QueryError from "./../../../../../components/shared/Errors/QueryError/QueryError";
import NetworkError from "./../../../../../components/shared/Errors/NetworkError/NetworkError";

const UpdateReview = () => {
    const [comment, setComment] = useState("");
    const [review, setReview] = useState([]);
    const [active, setActive] = useState(true);
    const [star, setStar] = useState(0);
    const { id } = useParams();

    const [getReview, { data, error, loading, refetch }] =
        useLazyQuery(GET_SINGLE_REVIEW);

    const [reviewUpdated, { error: updateReviewError }] = useMutation(
        REVIEW_UPDATED,
        {
            update(cache, data) {
                if (data?.data.reviewUpdated) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `Review Updated`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            },
        }
    );

    useEffect(() => {
        getReview({
            variables: { reviewId: id },
        });
        setReview(data?.getReview);
        setStar(data?.getReview.star);
        setComment(data?.getReview.comment);
    }, [id]);

    const handleClickRating = (newRating) => {
        setStar(newRating);
        setActive(false);
    };

    const handleComment = (value) => {
        setComment(value);
        setActive(false);
    };

    const handleUpdateReviewSubmit = (event) => {
        event.preventDefault();

        const reviewUpdateObj = {
            comment,
            star,
        };
        reviewUpdated({
            variables: {
                reviewId: id,
                input: reviewUpdateObj,
            },
        });
        setActive(true);
    };

    if (error || updateReviewError) {
        if (error?.graphQLErrors.length !== 0) {
            return <QueryError error={error?.graphQLErrors} />;
        } else if (updateReviewError?.graphQLErrors.length !== 0) {
            return <QueryError error={updateReviewError?.graphQLErrors} />;
        } else {
            if (error?.networkError || updateReviewError?.networkError) {
                return (
                    <NetworkError
                        networkError={
                            error?.networkError ||
                            updateReviewError?.networkError
                        }
                    />
                );
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>UpdateReview</title>
            </Helmet>
            <Container className="my-5">
                <Row>
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
                        <Col lg={5} className="m-auto text-white bg-dark p-5">
                            <h2 className="text-white text-center mb-3">
                                Update Review
                            </h2>
                            <h5 className="text-center">
                                The Service Name Of{" "}
                                {data?.getReview?._service?.name}
                            </h5>
                            <Form>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicComment"
                                >
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="comment"
                                        defaultValue={review?.comment}
                                        onChange={(e) =>
                                            handleComment(e.target.value)
                                        }
                                        placeholder="Leave a comment here"
                                        style={{ height: "100px" }}
                                    />
                                </Form.Group>
                                <h6 className="pb-2">Rating</h6>
                                <StarRatings
                                    rating={star}
                                    starRatedColor="red"
                                    changeRating={handleClickRating}
                                    numberOfStars={5}
                                    starDimension="30px"
                                    name={review?._id}
                                />

                                <div className="pt-4">
                                    <Button
                                        disabled={active}
                                        className={`btn`}
                                        variant="primary"
                                        type="submit"
                                        onClick={(e) => {
                                            handleUpdateReviewSubmit(e);
                                        }}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default UpdateReview;
