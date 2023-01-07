import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_SERVICE } from "../../../../graphql/mutations";
import {
    GET_ALL_SERVICES_BY_PAGE,
    GET_ALL_SERVICES_UNDER_THE_LIMIT,
} from "../../../../graphql/queries";
import Dashboard from "../../../../layout/Dashboard/Dashboard";

const Profile = ({ handleSubmit, handleChange, name, email, about }) => {

    const handle
    return (
        <Dashboard>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Container className="my-5">
                <Row className="m-0">
                    <Col lg={7} className="m-auto bg-dark p-lg-5 p-4">
                        <h2 className="text-white text-center mb-4">
                            Profile Information
                        </h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label className="text-white">
                                    Email
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={email}
                                    placeholder="Enter Email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label className="text-white">
                                    Image
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="image"
                                    placeholder="Enter Image"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label className="text-white">
                                    Name
                                </Form.Label>
                                <Form.Control
                                    name="name"
                                    type="text"
                                    onChange={handleChange}
                                    value={name}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="about">
                                <Form.Label className="text-white">
                                    About
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="about"
                                    onChange={handleChange}
                                    value={about}
                                    placeholder="Enter About"
                                />
                            </Form.Group>

                            <Button
                                size="lg"
                                className="text-white"
                                variant="outline-dark"
                                type="submit"
                            >
                                Save
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Dashboard>
    );
};

export default Profile;
