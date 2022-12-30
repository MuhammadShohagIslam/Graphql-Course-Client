import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Swal from "sweetalert2";
import Main from "../../../layout/Main";

const UpdateReview = () => {
    const [comment, setComment] = useState("");
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(true);
    const [star, setStar] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        loadingReviewById(id);
    }, [id]);

    const loadingReviewById = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://server-smoky-ten.vercel.app/reviews/${id}`
            );
            const data = await response.data;
            setReview(data);
            setStar(data.star);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error.message);
        }
    };

    const updateReview = async (reviewUpdateObj) => {
        const response = await axios.put(
            `https://server-smoky-ten.vercel.app/reviews/${id}`,
            reviewUpdateObj,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.data;
        if (data.modifiedCount > 0) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: `${review?.serviceName} Service Review Updated`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

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
        updateReview(reviewUpdateObj);
        setActive(true);
    };

    return (
        <Main>
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
                                The Service Name Of {review?.serviceName}
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
                                    name={review._id}
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
        </Main>
    );
};

export default UpdateReview;
