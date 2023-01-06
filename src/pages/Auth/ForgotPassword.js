import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import Main from "../../layout/Main/Main";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { state, forgotPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // validation
        if (email.trim() === "") {
            toast.error("Enter Email Address");
            return;
        }
        if (!email || !email.includes("@")) {
            toast.error("Enter Valid Email Address");
            return;
        }
        const actionCodeSettings = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
        };
        setLoading(true);
        forgotPassword(email, actionCodeSettings)
            .then(() => {
                toast.success(
                    `Email is sent to the ${email}.Click the link to complete to the password reset process`
                );
                // set loading false
                setLoading(false);
                //clear state
                setEmail("");
            })
            .catch((error) => {
                toast.error(
                    `Something wrong! for password reset like ${error.message}`
                );
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <Main>
            <Container className="my-5">
                <Row className="m-0">
                    <Col lg={6} className="m-auto bg-dark p-lg-5 p-4">
                        <h2 className="text-white text-center mb-3">
                            Forgot Password
                        </h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label className="text-white">
                                    Email Address
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email"
                                    autoFocus
                                />
                            </Form.Group>

                            <Button
                                size="lg"
                                disabled={loading}
                                className="text-white"
                                type="submit"
                            >
                                {loading ? "Loading..." : "Submit"}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Main>
    );
};

export default ForgotPassword;
