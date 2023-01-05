import axios from "axios";
import { useForm } from "react-hook-form";
import { GoogleAuthProvider } from "firebase/auth";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from './../../contexts/AuthProvider/AuthProvider';
import Main from '../../layout/Main/Main';

const Register = () => {
    const [accepted, setAccepted] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const {
        sendForSignInLinkToEmail,
        registerAndLoginWithProvider,
        setLoading,
    } = useAuth();

    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const actionCodeSettings = {
        url: process.env.REACT_APP_COMPLETED_REGISTRATION,
        handleCodeInApp: true,
    };

    const handleSignUp = (data) => {
        const { email } = data;
        sendForSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: `Send link to the ${email}, Please Complete SignUp!`,
                    showConfirmButton: false,
                    timer: 8500,
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleSignUpWithProvider = (event, providerName) => {
        event.preventDefault();
        if (providerName === "google") {
            popupForSignInProvider(googleProvider);
        }
    };

    const popupForSignInProvider = (provider) => {
        registerAndLoginWithProvider(provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                const currentUser = {
                    name: user?.displayName,
                    email: user?.email,
                };
                axios
                    .post(
                        "https://server-smoky-ten.vercel.app/jwt",
                        currentUser,
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then((res) => {
                        const data = res.data;
                        localStorage.setItem("tutor-token", data.token);
                    });
                navigate("/");
            })
            .catch((error) => {
                toast.error(error?.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Main>
            <Helmet>
                <title>SignUp</title>
            </Helmet>
            <Container className="my-5">
                <Row className="m-0">
                    <Col lg={5} className="m-auto bg-dark p-lg-5 p-4">
                        <h2 className="text-white text-center fs-lg-3 fs-5 mb-lg-5 mb-3">
                            Sign Up Connected With Me
                        </h2>

                        <div className="d-grid gap-2">
                            <Button
                                className="fs-4 d-flex justify-content-center px-2"
                                size="sm"
                                onClick={(e) =>
                                    handleSignUpWithProvider(e, "google")
                                }
                            >
                                <div className="d-flex py-2 h-100">
                                    <FaGoogle className="align-baseline me-2 fs-4" />
                                </div>
                                <h5 className="mb-0 fs-lg-3 fs-6 d-flex align-baseline h-100 pt-2">
                                    Continue with Google
                                </h5>
                            </Button>
                        </div>
                        <h3 className="text-white text-center mt-2">Or</h3>
                        <Form onSubmit={handleSubmit(handleSignUp)}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label className="text-white">
                                    Email address
                                </Form.Label>
                                <Form.Control
                                    {...register("email", {
                                        required: "email Is Required!",
                                    })}
                                    name="email"
                                    type="email"
                                    placeholder="Enter Email"
                                />
                                {errors.email && (
                                    <p className="text-red-600">
                                        {errors.email?.message}
                                    </p>
                                )}
                            </Form.Group>
                            <Button
                                size="lg"
                                className="text-white"
                                variant="outline-dark"
                                type="submit"
                            >
                                Register
                            </Button>
                            <hr className="border border-white border-1 opacity-50 mt-4"></hr>
                            <p className="text-white text-center">
                                Already have an account?{" "}
                                <Link
                                    className="text-decoration-underline"
                                    to="/login"
                                >
                                    Log in
                                </Link>
                            </p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Main>
    );
};

export default Register;
