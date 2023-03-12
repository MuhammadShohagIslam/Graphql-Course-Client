import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { CREATE_NEW_SERVICE } from "../../../../../graphql/mutations";
import {
    GET_ALL_SERVICES
} from "../../../../../graphql/queries";
import FileUpload from "./../../../../../components/shared/FileUpload/FileUpload";
import { useAuth } from "./../../../../../contexts/AuthProvider/AuthProvider";
import DisplayError from './../../../../DisplayError/DisplayError';

const AddService = () => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        img: {
            public_id: "",
            url: "",
        },
        price: "",
    });
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(true);
    const { state } = useAuth();
    const { user } = state;

    const [createNewService, {error}] = useMutation(CREATE_NEW_SERVICE, {
        // update the cache of all reviews corresponding by service id
        update: (cache, data) => {
            // read the data of all reviews corresponding by service id
            const { getAllService } = cache.readQuery({
                query: GET_ALL_SERVICES
            });
            // write the cached
            cache.writeQuery({
                query: GET_ALL_SERVICES,
                data: {
                    getAllService: [
                        data?.data.createNewService,
                        ...getAllService,
                    ],
                },
            });
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Service Created Successfully",
                showConfirmButton: false,
                timer: 2500,
            });
        },
        onError: (error) => {
            setLoading(false);
        },
    });

    const handleServiceSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        // validation
        if (!values.name) {
            return toast.error("Please Enter Service Name!");
        }
        if (!values.img.url) {
            return toast.error("Please Enter Image!");
        }
        if (!values.price) {
            return toast.error("Please Enter Price!");
        }
        if (!values.description) {
            return toast.error("Please Enter Description!");
        }
        setLoading(true);
        createNewService({
            variables: {
                input: values,
            },
            refetchQueries: [
                {
                    query: GET_ALL_SERVICES,
                    variables: {
                        page: 1,
                    },
                },
            ],
        });
        form.reset();
        setLoading(false);
    };
    const handleChange = (e) => {
        setActive(false);
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };
    // if (error) {
    //     return (
    //         <DisplayError
    //             message={error.message.split(":")[0]}
    //             statusCode={error.message.split(":")[1].split(" ").slice(-1)}
    //         />
    //     );
    // }
    return (
        <>
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
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label className="text-white">
                                    Service Name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    placeholder="Enter Service Name"
                                />
                            </Form.Group>
                            <FileUpload
                                user={user}
                                values={values}
                                setValues={setValues}
                                setLoading={setLoading}
                                loading={loading}
                            />
                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label className="text-white">
                                    Price
                                </Form.Label>
                                <Form.Control
                                    name="price"
                                    type="text"
                                    onChange={handleChange}
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
                                    as="textarea"
                                    onChange={handleChange}
                                    placeholder="Enter Description"
                                />
                            </Form.Group>

                            <Button
                                size="lg"
                                className="text-white"
                                variant="outline-dark"
                                type="submit"
                                disabled={active || loading}
                            >
                                {loading ? "Loading" : "Save"}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AddService;
