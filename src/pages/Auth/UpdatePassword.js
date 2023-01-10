import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";

const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { updateThePassword } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // validation
        if (newPassword.trim() === "") {
            toast.error("Enter Password");
            return;
        }
        if (!newPassword || newPassword.length < 6) {
            toast.error("Enter Valid Password!");
            return;
        }
        setLoading(true);
        updateThePassword(newPassword)
            .then(() => {
                toast.success("Password Is Updated!");
                // set loading false
                setLoading(false);
                //clear state
                setNewPassword("");
            })
            .catch((error) => {
                toast.error(
                    `Something wrong! for password updating like ${error.message}`
                );
                setLoading(false);
            });
    };

    return (
        <>
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
                                    type="text"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    placeholder="Enter Your New Password"
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
        </>
    );
};

export default UpdatePassword;
