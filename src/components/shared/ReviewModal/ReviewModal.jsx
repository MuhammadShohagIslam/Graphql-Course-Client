import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import classes from "./ReviewModal.module.css";
import StarRatings from "react-star-ratings";

const ReviewModal = ({
    showReviewModal,
    setShowReviewModal,
    serviceName,
    handleReviewSubmit,
    handleClickRating,
    setComment,
    star,
}) => {
    return (
        <Modal
            show={showReviewModal}
            onHide={() => setShowReviewModal(!showReviewModal)}
        >
            <Modal.Header closeButton>
                <Modal.Title>{serviceName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="comment"
                            onChange={(e)=>setComment(e.target.value)}
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
                        name={serviceName}
                    />
                    <Modal.Footer className="mt-5">
                        <Button
                            className={`${classes.modalReviewButton} btn`}
                            variant="primary"
                            type="submit"
                            onClick={(e)=> {
                                handleReviewSubmit(e);
                                setShowReviewModal(!showReviewModal)
                            }}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ReviewModal;
