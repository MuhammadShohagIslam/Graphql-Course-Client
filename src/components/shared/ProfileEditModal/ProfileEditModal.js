import React from "react";
import { Modal, Button, Form } from "react-bootstrap";


const ProfileEditModal = ({
    showModal,
    setShowModal,
    modalName,
    handleSubmit,
    values,
    loading,
    handleChange,
}) => {
    return (
        <Modal show={showModal} onHide={() => setShowModal(!showModal)} >
            <Modal.Header closeButton>
                <Modal.Title>{modalName}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label className="text-white">Username</Form.Label>
                        <Form.Control
                            name="username"
                            type="text"
                            onChange={handleChange}
                            value={values?.username}
                            placeholder="Enter Username"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label className="text-white">fullName</Form.Label>
                        <Form.Control
                            name="fullName"
                            type="text"
                            onChange={handleChange}
                            value={values?.fullName}
                            placeholder="Enter fullName"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label className="text-white">Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={values?.email}
                            placeholder="Enter Email"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="about">
                        <Form.Label className="text-white">About</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="about"
                            onChange={handleChange}
                            value={values?.about}
                            placeholder="Enter About"
                        />
                    </Form.Group>

                    <Button
                        size="lg"
                        className="text-white"
                        variant="outline-dark"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Loading" : "Save"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileEditModal;
