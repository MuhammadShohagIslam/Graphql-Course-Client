import axios from "axios";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import Main from "../../layout/Main";

const AddService = () => {
    const handleServiceSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const serviceName = form.serviceName.value;
        const image = form.image.value;
        const price = form.price.value;
        const description = form.description.value;

        // validation
        if (!serviceName) {
            return toast.error("Please Enter Service Name!");
        }
        if (!image) {
            return toast.error("Please Enter Image!");
        }
        if (!price) {
            return toast.error("Please Enter Price!");
        }
        if (!description) {
            return toast.error("Please Enter Description!");
        }

        const newServiceObj = {
            name: serviceName,
            img: image,
            price,
            description,
        };

        createNewService(newServiceObj);
        form.reset();
    };
    const createNewService = async (newServiceObj) => {
        try {
            const response = await axios.post(
                `https://server-smoky-ten.vercel.app/services`,
                newServiceObj,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.data;
            if (data.acknowledged) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: `${newServiceObj?.name} Service Is Created`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {}
    };
    return (
        <Main>
            <Helmet>
                <title>AddService</title>
            </Helmet>
            <Container className="my-5">
                <Row className="m-0">
                    <Col lg={7} className="m-auto bg-dark p-lg-5 p-4">
                        <h2 className="text-white text-center mb-4">
                            Let's Create New Service
                        </h2>
                        <Form onSubmit={handleServiceSubmit}>
                            <Form.Group
                                className="mb-3"
                                controlId="serviceName"
                            >
                                <Form.Label className="text-white">
                                    Service Name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="serviceName"
                                    placeholder="Enter Service Name"
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
                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label className="text-white">
                                    Price
                                </Form.Label>
                                <Form.Control
                                    name="price"
                                    type="text"
                                    placeholder="Enter Price"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="description"
                            >
                                <Form.Label className="text-white">
                                    Description
                                </Form.Label>
                                <Form.Control
                                    name="description"
                                    type="text"
                                    placeholder="Enter Description"
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
        </Main>
    );
};

export default AddService;
