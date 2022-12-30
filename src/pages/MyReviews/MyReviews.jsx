import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import ReviewTable from "../../components/shared/ReviewTable/ReviewTable";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import Main from "../../layout/Main";
const MyReviews = () => {
    const [reviewsBySpecificUser, setReviewsBySpecificUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, logOut } = useAuth();

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `https://server-smoky-ten.vercel.app/reviews/user?name=${user?.displayName}&email=${user?.email}`,
                {
                    headers: {
                        authorization: `Bear ${localStorage.getItem(
                            "tutor-token"
                        )}`,
                    },
                }
            )
            .then((res) => {
                const data = res.data;
                setReviewsBySpecificUser(data);
                setLoading(false);
            })
            .catch((error) => {
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                ) {
                    return logOut();
                }
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user?.displayName, user?.email, logOut]);

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
                            {reviewsBySpecificUser.length > 0 ? (
                                <ReviewTable
                                    reviewsBySpecificUser={
                                        reviewsBySpecificUser
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
