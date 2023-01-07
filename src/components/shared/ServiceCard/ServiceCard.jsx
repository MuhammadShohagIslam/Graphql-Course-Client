/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import AOS from "aos";
import React, { useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";
import { avgRating } from "../../../utils/avgRating";
import classes from "./ServiceCard.module.css";
import { GET_ALL_REVIEWS_UNDER_QUERY } from "../../../graphql/queries";

const ServiceCard = ({ service, isAdmin = false, handleServiceDelete }) => {
    const { _id, img, name, description, price } = service;
    const { data, refetch } = useQuery(GET_ALL_REVIEWS_UNDER_QUERY, {
        variables: {
            query: _id,
        },
    });

    useEffect(() => {
        AOS.init();
        AOS.refresh();
        refetch();
    }, []);

    return (
        <>
            <Col
                data-aos="fade-up"
                data-aos-delay="1"
                lg={4}
                md={6}
                sm={12}
                className="mb-4"
            >
                <Card className={classes.serviceCard}>
                    <Card.Header className="bg-white text-center py-2 pb-3">
                        {avgRating(data?.getAllReview)}
                    </Card.Header>
                    <PhotoProvider
                        speed={() => 800}
                        easing={(type) =>
                            type === 2
                                ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
                                : "cubic-bezier(0.34, 1.56, 0.64, 1)"
                        }
                    >
                        <PhotoView src={img}>
                            <Card.Img
                                className={`${classes.serviceCardImage} rounded-0`}
                                variant="top"
                                alt={name}
                                src={
                                    img?.url
                                        ? img?.url
                                        : "https://via.placeholder.com/200x200.png?text=Service-Image"
                                }
                            />
                        </PhotoView>
                    </PhotoProvider>

                    <Card.Body>
                        <Card.Title> {name}</Card.Title>
                        <Card.Text className="text-justify">
                            {description?.length > 100
                                ? description.slice(0, 100) + "..."
                                : description}
                        </Card.Text>
                        <div className={classes.serviceCostRating}>
                            <h5>
                                <span>Per Month: </span>${price}
                            </h5>
                        </div>
                        {!isAdmin && (
                            <Link
                                className={`${classes.serviceCardButtonWrapper} pt-2`}
                                to={`/services/${_id}`}
                            >
                                <Button
                                    className={`${classes.serviceCardButton}`}
                                >
                                    Service Details
                                    <FaArrowRight className="ms-1" />
                                </Button>
                            </Link>
                        )}
                        {isAdmin && (
                            <div className="d-flex justify-content-around">
                                <Link
                                    className={`${classes.editButton}`}
                                    to={`/dashboard/admin/edit-service/${_id}`}
                                >
                                    <Button
                                        className={`${classes.serviceCardButton} bg-warning`}
                                    >
                                        <BiEdit className="me-1" />
                                        Edit Service
                                    </Button>
                                </Link>
                                <div
                                    className={``}
                                    onClick={() => handleServiceDelete(_id)}
                                >
                                    <Button
                                        className={`${classes.serviceCardButton} bg-danger`}
                                    >
                                        <AiTwotoneDelete className="me-1" />
                                        Delete Service
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};

export default ServiceCard;
