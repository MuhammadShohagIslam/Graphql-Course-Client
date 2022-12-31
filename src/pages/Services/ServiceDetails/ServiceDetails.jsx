import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import axios from "axios";
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

const ServiceDetails = () => {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState([]);
    const [star, setStar] = useState(0);
    const [service, setService] = useState({});

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const { loading, error, data } = useQuery(GET_SERVICE_BY_ID, {
        variables: { serviceId: id },
    });

    const {
        loading: loadingReviews,
        error: LoadingReviews,
        data: reviewsData,
    } = useQuery(GET_REVIEWS_BY_SERVICE_ID, {
        variables: { query: id },
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

    console.log(reviews);

    const handleReviewShowModal = () => {
        if (user && user?.uid) {
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

    const createReview = async (reviewObj) => {
        axios
            .post("https://server-smoky-ten.vercel.app/reviews", reviewObj, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(async (res) => {
                const data = res.data;
                if (data?.acknowledged) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Review Created Successfully",
                        showConfirmButton: false,
                        timer: 2500,
                    });
                }
                const response = await axios.get(
                    `https://server-smoky-ten.vercel.app/reviews?id=${_id}`
                );
                const d = await response.data;
                setReviews(d);
            })
            .catch((error) => {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `${error.response.data.message}`,
                    showConfirmButton: false,
                    timer: 2500,
                });
            });
    };

    const handleReviewSubmit = async (event) => {
        try {
            event.preventDefault();
            const reviewObj = {
                serviceId: _id,
                serviceName: name,
                name: user?.displayName,
                email: user?.email,

                img: user?.photoURL,
                comment,
                star,
            };
            createReview(reviewObj);
            setComment("");
        } catch (error) {
            toast.error(error.message);
        }
    };
    if (error) return `Error! ${error}`;

    return (
        <Main>
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
                                            {user && user?.uid
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
