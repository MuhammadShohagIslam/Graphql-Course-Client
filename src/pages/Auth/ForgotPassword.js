/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "./../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let intended = location.state;
        if (intended) {
            return;
        } else {
            if (
                user &&
                user.token &&
                (user.role === "admin" || user.role === "subscriber")
            ) {
                navigate("/");
            } else {
                navigate("/forgot/password");
            }
        }
    }, [user, navigate]);

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
        sendPasswordResetEmail(auth, email, actionCodeSettings)
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
            });
    };

    const forgotPasswordForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                autoFocus
            />
            <br />
            <button
                type="submit"
                className="btn btn-outline-primary"
                disabled={loading}
            >
                {loading ? "Loading..." : "Submit"}
            </button>
        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Forgot Password</h4>
                    {forgotPasswordForm()}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
