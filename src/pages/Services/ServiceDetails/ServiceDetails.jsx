import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Review from "../../../components/shared/Review/Review";
import ReviewModal from "../../../components/shared/ReviewModal/ReviewModal";
import { useAuth } from "../../../contexts/AuthProvider/AuthProvider";
import Main from "../../../layout/Main";
import { avgRating } from "./../../../utils/avgRating";
import classes from "./ServiceDetails.module.css";

const GET_SERVICE_BY_ID = gql`
    query GetService($serviceId: ID!) {
        getService(serviceId: $serviceId) {
            _id
            name
            description
            img
            price
        }
    }
`;

const GET_REVIEWS_BY_SERVICE_ID = gql`
    query GetAllReview($query: ID) {
        getAllReview(query: $query) {
            _id
            _service
            comment
            img
            name
            serviceName
            star
            createdAt
        }
    }
`;

const CREATE_NEW_REVIEW = gql`
    mutation CreateNewReview($input: CreateNewReviewInput!) {
        createNewReview(input: $input) {
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

const ServiceDetails = () => {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState([]);
    const [star, setStar] = useState(0);
    const [service, setService] = useState({});

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { state, user: currentUser } = useAuth();
    const { user } = state;

    const { loading, error, data } = useQuery(GET_SERVICE_BY_ID, {
        variables: { serviceId: id },
    });

    const [
        addReview,
        {
            data: createdReviewData,
            error: createdReviewError,
            loading: createdReviewLoading,
        },
    ] = useMutation(CREATE_NEW_REVIEW, {
        // read query from cache / write query to cache
        update: (cache, { data: { addReview } }) => {
            // read Query from cache
            const { getAllReview } = cache.readQuery({
                query: GET_REVIEWS_BY_SERVICE_ID,
                variables: { query: id }
            });
            // write Query to cache
            cache.writeQuery({
                query: GET_REVIEWS_BY_SERVICE_ID,
                variables: { query: id },
                data: {
                    getAllReview: [addReview, ...getAllReview]
                }
            });
        },
        refetchQueries: [
            {
                query: GET_REVIEWS_BY_SERVICE_ID,
                variables: { query: id },
                awaitRefetchQueries: true,
            },
        ]
    });

    const {
        loading: loadingReviews,
        error: errorReviews,
        data: reviewsData,
        refetch,
    } = useQuery(GET_REVIEWS_BY_SERVICE_ID, {
        variables: { query: id },
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (data && data?.getService) {
            setService(data.getService);
        }
    }, [data]);

    useEffect(() => {
        if (reviewsData && reviewsData?.getAllReview) {
            setReviews(reviewsData.getAllReview);
        }
    }, [reviewsData]);

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
                _service: _id,
                serviceName: name,
                name: user?.name,
                email: user?.email,
                img: currentUser?.photoURL,
                comment,
                star,
            };
            addReview({
                variables: {
                    input: reviewObj,
                },
            });
            if (createdReviewData && createdReviewData?.createNewReview) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Review Created Successfully",
                    showConfirmButton: false,
                    timer: 2500,
                });
            }
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
    if (error || errorReviews) return `Error! ${error}`;

    return (
        <Main>
            <Helmet>
                <title>ServiceDetails</title>
            </Helmet>
            {loading  ? (
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
                                            src={img}
                                        />
                                    </div>
                                </Col>
                                <Col lg={7}>
                                    <div
                                        className={`${classes.serviceDetailsWrapper} bg-dark text-white h-100`}
                                    >
                                        <h2>{name}</h2>
                                        <h5>Per Month: ${price}</h5>
                                        {avgRating(reviews)}
                                        <hr className="border border-white opacity-50 mt-3"></hr>
                                        <p className="pb-2">{description}</p>

                                        <Button
                                            className="btn"
                                            size="lg"
                                            onClick={() =>
                                                handleReviewShowModal()
                                            }
                                        >
                                            {user && user?.name && user?.token
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
                                            {reviews.length > 0 ? (
                                                <>
                                                    {reviews.map((review) => (
                                                        <Review
                                                            key={review._id}
                                                            review={review}
                                                        />
                                                    ))}
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
        </Main>
    );
};

export default ServiceDetails;
