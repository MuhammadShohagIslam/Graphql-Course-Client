import React from "react";
import { Table, Button } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import StarRatings from "react-star-ratings";
import classes from "./ReviewTable.module.css";
import { Link } from "react-router-dom";

const ReviewTable = ({ reviewsBySpecificUser, handleReviewDelete }) => {
    return (
        <Table className="text-center" striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Service Name</th>
                    <th>Review</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {reviewsBySpecificUser.map((userReview) => (
                    <tr key={userReview._id}>
                        <td>{userReview.serviceName}</td>
                        <td>
                            <StarRatings
                                rating={userReview.star}
                                isSelectable={false}
                                starRatedColor="red"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="2px"
                            />
                        </td>
                        <td>
                            <Link to={`/my-reviews/update/${userReview._id}`}>
                                <Button className="btn">
                                    <AiOutlineEdit />
                                </Button>
                            </Link>
                        </td>
                        <td>
                            <Button
                                onClick={(e) =>
                                    handleReviewDelete(
                                        e,
                                        userReview._id,
                                        userReview.serviceName
                                    )
                                }
                                className={`${classes.dangerButton} btn`}
                            >
                                <AiOutlineDelete />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ReviewTable;
