import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useAuth } from "./../../contexts/AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { updatePassword } from "firebase/auth";
import Main from "./../../layout/Main/Main";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_USER } from "./../../graphql/mutations";
import { GET_CURRENT_USER } from "./../../graphql/queries";

const CompleteSignUp = () => {
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [accepted, setAccepted] = useState(false);
    const url = `https://api.imgbb.com/1/upload?key=1a70c36c9c3fbf67a973f27648af9f7c`;
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm();

    const { createUser, userProfileUpdate, setLoading, dispatch, auth } =
        useAuth();

    const navigate = useNavigate();
    const [getService, { loading, error, data }] =
    useLazyQuery(GET_SERVICE_BY_ID);

    const [createNewUser, {data:userData}] = useMutation(CREATE_NEW_USER, {
        // update the cache of all reviews corresponding by service id
        update(cache, data) {
            // read the data of all reviews corresponding by service id
            const { currentUser } = cache.readQuery({
                query: GET_CURRENT_USER,
                variables: {
                    email: email,
                },
            });
            if (currentUser) {
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        email: currentUser.email,
                        name: currentUser.fullName,
                        role: currentUser.role,
                        token: token,
                    },
                });
            }
            console.log("a");
        },
    });

    useEffect(() => {
        const email = localStorage.getItem("emailForSignIn");
        if (email) {
            setEmail(email);
        }
    }, []);

    const handleCompleteSignUp = (data) => {
        const profileURL = data.profileImg[0];
        const { fullName, password} = data;

        const formData = new FormData();
        formData.append("image", profileURL);
        setLoadingRegister(true);
        axios
            .post(url, formData)
            .then((imgData) => {
                const productImgUrl = imgData.data.data.url;
                console.log(window.location.href, productImgUrl, email);

                createUser(email, window.location.href).then(async (result) => {
                    if (result.user.emailVerified) {
                        handleProfileUpdate(fullName, productImgUrl);
                        let user = auth.currentUser;
                        await updatePassword(user, password);
                        const idTokenResult = await user.getIdTokenResult();
                        const currentUserObject = {
                            email: email,
                            fullName: fullName,
                            profileImage: productImgUrl,
                        };
                        setToken(idTokenResult);
                        createNewUser({
                            variables: {
                                input: currentUserObject,
                            },
                        });

                        setLoading(false);
                        console.log("b",userData);
                        // Clear email from storage.
                        window.localStorage.removeItem("emailForSignIn");
                        toast.success("Registered Successfully!");
                        navigate("/");
                    }
                });
            })
            .catch((error) => {
                setLoading(false);
                setLoadingRegister(false);
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
                setLoadingRegister(false);
            });
    };

    const handleProfileUpdate = (fullName, photoURL) => {
        const profile = {
            displayName: fullName,
            photoURL,
        };
        userProfileUpdate(profile)
            .then((result) => {})
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <Main>
                <Container className="my-5">
                    <Row className="m-0">
                        <Col lg={5} className="m-auto bg-dark p-lg-5 p-4">
                            <h2 className="text-white text-center fs-lg-3 fs-5 mb-lg-5 mb-3">
                                Sign Up Connected With Me
                            </h2>
                            <Form onSubmit={handleSubmit(handleCompleteSignUp)}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label className="text-white">
                                        Email address
                                    </Form.Label>
                                    <Form.Control
                                        {...register("email")}
                                        name="email"
                                        defaultValue={email}
                                        readOnly
                                        type="email"
                                        placeholder="Enter Email"
                                    />
                                    {errors.email && (
                                        <p className="text-danger">
                                            {errors.email?.message}
                                        </p>
                                    )}
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="fullName"
                                >
                                    <Form.Label className="text-white">
                                        Full Name
                                    </Form.Label>
                                    <Form.Control
                                        {...register("fullName", {
                                            required: "Full Name Is Required!",
                                        })}
                                        type="text"
                                        name="fullName"
                                        placeholder="Enter Full Name"
                                    />
                                    {errors.fullName && (
                                        <p className="text-danger">
                                            {errors.fullName?.message}
                                        </p>
                                    )}
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="profileUpload"
                                >
                                    <Form.Label className="text-white">
                                        Profile Picture
                                    </Form.Label>
                                    <Form.Control
                                        {...register("profileImg", {
                                            required:
                                                "Profile Picture Is Required!",
                                        })}
                                        type="file"
                                    />
                                    {errors.profileImg && (
                                        <p className="text-danger">
                                            {errors.profileImg?.message}
                                        </p>
                                    )}
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="password"
                                >
                                    <Form.Label className="text-white">
                                        Password
                                    </Form.Label>
                                    <Form.Control
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message:
                                                    "Password should be 6 characters or longer",
                                            },
                                        })}
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                    />
                                    {errors.password && (
                                        <p className="text-danger">
                                            {errors.password?.message}
                                        </p>
                                    )}
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicCheckbox"
                                >
                                    <Form.Check
                                        className="text-white"
                                        type="checkbox"
                                        onClick={(e) =>
                                            setAccepted(e.target.checked)
                                        }
                                        label={
                                            <>
                                                By Register, you agree to our
                                                <Link
                                                    className="mx-1 text-decoration-underline"
                                                    to="/term-condition"
                                                >
                                                    Terms of Use
                                                </Link>
                                                and
                                                <Link
                                                    className="ms-1 text-decoration-underline"
                                                    to="/privacy-policy"
                                                >
                                                    Privacy Policy
                                                </Link>
                                            </>
                                        }
                                    />
                                </Form.Group>
                                <Button
                                    size="lg"
                                    className="text-white"
                                    variant="outline-dark"
                                    type="submit"
                                    disabled={!accepted}
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
        </>
    );
};

export default CompleteSignUp;
