import React, { useState, useMemo } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import omitDeep from "omit-deep";
import { toast } from "react-hot-toast";
// import Swal from "sweetalert2";
import { useMutation, useQuery } from "@apollo/client";
import { PROFILE_UPDATE } from "../../../../graphql/mutations";
import Dashboard from "../../../../layout/Dashboard/Dashboard";
import FileUpload from "../../../../components/shared/FileUpload/FileUpload";
import { useAuth } from "./../../../../contexts/AuthProvider/AuthProvider";
import { GET_CURRENT_USER } from "./../../../../graphql/queries";

const Profile = () => {
    const [values, setValues] = useState({
        username: "",
        fullName: "",
        images: [],
        email: "",
        about: "",
    });
    const [loading, setLoading] = useState(false);

    const { state } = useAuth();
    const { user } = state;

    const { data } = useQuery(GET_CURRENT_USER);

    useMemo(() => {
        if (data) {
            setValues({
                ...values,
                username: data.currentUser.username,
                fullName: data.currentUser.fullName,
                images: omitDeep(data.currentUser.images, ["__typename"]),
                email: data.currentUser.email,
                about: data.currentUser.about,
            });
        }
    }, [data]);

    const [profileUpdate] = useMutation(PROFILE_UPDATE, {
        update: ({ data }) => {
            toast.success("Profile Updated Successfully!");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        profileUpdate({
            variables: {
                input: values,
            },
        });
        setLoading(false);
    };
    const { username, fullName, email, about } = values;
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

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
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label className="text-white">
                                    Username
                                </Form.Label>
                                <Form.Control
                                    name="username"
                                    type="text"
                                    onChange={handleChange}
                                    value={username}
                                    placeholder="Enter Username"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="fullName">
                                <Form.Label className="text-white">
                                    fullName
                                </Form.Label>
                                <Form.Control
                                    name="fullName"
                                    type="text"
                                    onChange={handleChange}
                                    value={fullName}
                                    placeholder="Enter fullName"
                                />
                            </Form.Group>
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
                            <FileUpload
                                values={values}
                                setValues={setValues}
                                setLoading={setLoading}
                                isProfileImageUpload={true}
                                user={user}
                            />

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
                                disabled={loading}
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

export default Profile;
