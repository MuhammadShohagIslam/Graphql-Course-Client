import React, { useMemo, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import Dashboard from "./../../../../../layout/Dashboard/Dashboard";
import { useParams } from "react-router-dom";
import { UPDATED_SERVICE } from "../../../../../graphql/mutations";
import { GET_SERVICE_BY_ID } from "../../../../../graphql/queries";
import FileUpload from "../../../../../components/shared/FileUpload/FileUpload";
import { useAuth } from "./../../../../../contexts/AuthProvider/AuthProvider";

const UpdateService = () => {
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
    const { serviceId } = useParams();
    const { state } = useAuth();
    const { user } = state;
 
    const { data } = useQuery(GET_SERVICE_BY_ID, {
        variables: {
            serviceId: serviceId,
        },
    });

    useMemo(() => {
        if (data) {
            setValues({
                ...values,
                name: data.getService.name,
                description: data.getService.description,
                img: {
                    url: data.getService.img?.url,
                    public_id: data.getService.img?.public_id,
                },
                price: data.getService.price,
            });
        }
    }, [data]);

    const [updateService] = useMutation(UPDATED_SERVICE, {
        update: (cache, data) => {
            if (data?.data.updateService) {
                toast.success("Service Updated");
            }
            setLoading(false);
        },
        refetchQueries: [
            {
                query: GET_SERVICE_BY_ID,
                variables: {
                    serviceId: serviceId,
                },
            },
        ],
    });

    const handleServiceSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateService({
            variables: {
                serviceId: serviceId,
                input: values,
            },
        });
    };

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <Dashboard>
            <Helmet>
                <title>Update Service</title>
            </Helmet>
            <Container className="my-5">
                <Row className="m-0">
                    <Col lg={7} className="m-auto bg-dark p-lg-5 p-4">
                        <h2 className="text-white text-center mb-4">
                            Let's Update {values.name} Service
                        </h2>
                        <Form onSubmit={handleServiceSubmit}>
                            <Form.Group
                                className="mb-3"
                                controlId="name"
                            >
                                <Form.Label className="text-white">
                                    Service Name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    name="name"
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
                                    value={values.price}
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
                                    value={values.description}
                                    onChange={handleChange}
                                    placeholder="Enter Description"
                                />
                            </Form.Group>

                            <Button
                                disabled={loading}
                                size="lg"
                                className="text-white"
                                variant="outline-dark"
                                type="submit"
                            >
                                {loading ? "Loading" : "Save"}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Dashboard>
    );
};

export default UpdateService;
