import {
    useLazyQuery, useMutation,
    useQuery, useSubscription
} from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Review from "../../../components/shared/Review/Review";
import ReviewModal from "../../../components/shared/ReviewModal/ReviewModal";
import { useAuth } from "../../../contexts/AuthProvider/AuthProvider";
import {
    GET_REVIEWS_BY_SERVICE_ID,
    GET_SERVICE_BY_ID
} from "../../../graphql/queries";
import {
    ADDED_REVIEW, REMOVED_REVIEW, UPDATED_REVIEW
} from "../../../graphql/subscriptions";
import { CREATE_NEW_REVIEW } from "./../../../graphql/mutations";
import { avgRating } from "./../../../utils/avgRating";
import classes from "./ServiceDetails.module.css";

const ServiceDetails = () => {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [comment, setComment] = useState("");
    const [star, setStar] = useState(0);
    const [service, setService] = useState({});

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = useAuth();
    const { user } = state;

    const [getService, { loading, error, data }] =
        useLazyQuery(GET_SERVICE_BY_ID);

    const [createNewReview, { error: createdReviewError }] = useMutation(
        CREATE_NEW_REVIEW,
        {
            onError: (error) => {
                if (error?.message) {
                    toast.error("Already You Reviewed This Service");
                }
            },
        }
    );

    const {
        loading: loadingReviews,
        error: errorReviews,
        data: reviewsData
    } = useQuery(GET_REVIEWS_BY_SERVICE_ID, {
        variables: { query: id },
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useMemo(() => {
        if (data && data?.getService) {
            setService(data.getService);
        }
    }, [data]);

    useEffect(() => {
        getService({ variables: { serviceId: id } });
    }, [id, getService]);

    const { _id, name, img, description, price } = service;

    const handleReviewShowModal = () => {
        if (user && user?.token) {
            setShowReviewModal((prev) => !prev);
            return;
        }
        return navigate("/login", {
            state: { from: location },
            replace: true,
        });
    };
    const handleClickRating = (newRating) => {
        setStar(newRating);
    };

    const handleReviewSubmit = async (event) => {
        try {
            event.preventDefault();
            const reviewObj = {
                serviceId: _id,
                email: user?.email,
                comment,
                star,
            };
            createNewReview({
                variables: {
                    input: reviewObj,
                },
                refetchQueries: [
                    {
                        query: GET_REVIEWS_BY_SERVICE_ID,
                        variables: { query: id },
                    },
                ],
            });
            setComment("");
        } catch (error) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: `${error}`,
                showConfirmButton: false,
                timer: 2500,
            });
            toast.error(error.message);
        }
    };

    // subscription
    useSubscription(ADDED_REVIEW, {
        onData: ({ client, data }) => {
            const { getAllReview } = client.readQuery({
                query: GET_REVIEWS_BY_SERVICE_ID,
                variables: {
                    query: id,
                },
            });
            // write the cached
            client.writeQuery({
                query: GET_REVIEWS_BY_SERVICE_ID,
                variables: {
                    query: id,
                },
                data: {
                    getAllReview: [data.data.addedReview, ...getAllReview],
                },
            });
            toast.success("New Review Added!");
        },
    });

    // review updated
    useSubscription(UPDATED_REVIEW, {
        onData: ({ client, data }) => {
            const { getAllReview } = client.readQuery({
                query: GET_REVIEWS_BY_SERVICE_ID,
                variables: {
                    query: id,
                },
            });
            let filteredReview = getAllReview.filter(
                (review) => review._id !== data.data.updatedReview._id
            );
            // write the cached
            client.writeQuery({
                query: GET_REVIEWS_BY_SERVICE_ID,
                variables: {
                    query: id,
                },
                data: {
                    getAllReview: [data.data.updatedReview, ...filteredReview],
                },
            });
            toast.success("Review Updated Added!");
        },
    });

    // review removed
    useSubscription(REMOVED_REVIEW, {
        onData: ({ client, data }) => {
            // readQuery from cache
            const { getAllReview } = client.readQuery({
                query: GET_REVIEWS_BY_SERVICE_ID,
                variables: {
                    query: id,
                },
            });
            let filteredReview = getAllReview.filter(
                (review) => review._id !== data.data.deletedReview._id
            );
            // write the cached
            client.writeQuery({
                query: GET_REVIEWS_BY_SERVICE_ID,
                variables: {
                    query: id,
                },
                data: {
                    getAllReview: [...filteredReview],
                },
            });
            // show toast notification
            toast.error("One Review deleted!");
        },
    });

    // if (error || errorReviews || createdReviewError) return `Error! ${error}`;

    return (
        <>
            <Helmet>
                <title>ServiceDetails</title>
            </Helmet>
            {loading ? (
                <div
                    style={{ height: "400px" }}
                    className="d-flex justify-content-center align-items-center"
                >
                    <Spinner animation="border" className="spinner-color" />
                </div>
            ) : (
                <>
                    <section>
                        <Container className="py-5">
                            <Row>
                                <Col lg={5}>
                                    <div
                                        className={
                                            classes.serviceDetailsImagWrapper
                                        }
                                    >
                                        <Image
                                            className={
                                                classes.serviceDetailsImg
                                            }
                                            src={
                                                img?.url
                                                    ? img?.url
                                                    : "https://via.placeholder.com/200x200.png?text=Service-Image"
                                            }
                                        />
                                    </div>
                                </Col>
                                <Col lg={7}>
                                    <div
                                        className={`${classes.serviceDetailsWrapper} bg-dark text-white h-100`}
                                    >
                                        <h2>{name}</h2>
                                        <h5>Per Month: ${price}</h5>
                                        {avgRating(reviewsData?.getAllReview)}
                                        <hr className="border border-white opacity-50 mt-3"></hr>
                                        <p className="pb-2">{description}</p>

                                        <Button
                                            className="btn"
                                            size="lg"
                                            onClick={() =>
                                                handleReviewShowModal()
                                            }
                                        >
                                            {user && user?.fullName
                                                ? "Review The Service"
                                                : "Please login to add a review"}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <section>
                        <Container>
                            <Row className="my-5">
                                <Col lg={6}>
                                    <h4 className="mb-4">
                                        Reviews From Student of {name}
                                    </h4>
                                    {loading || loadingReviews ? (
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
                                            {reviewsData &&
                                            reviewsData?.getAllReview.length >
                                                0 ? (
                                                <>
                                                    {reviewsData?.getAllReview.map(
                                                        (review) => (
                                                            <Review
                                                                key={review._id}
                                                                review={review}
                                                            />
                                                        )
                                                    )}
                                                </>
                                            ) : (
                                                <h6 className="mt-5 text-dark">
                                                    There is no Reviews
                                                </h6>
                                            )}
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </>
            )}
            <ReviewModal
                showReviewModal={showReviewModal}
                setShowReviewModal={setShowReviewModal}
                serviceName={name}
                handleReviewSubmit={handleReviewSubmit}
                handleClickRating={handleClickRating}
                setComment={setComment}
                star={star}
            />
        </>
    );
};

export default ServiceDetails;
