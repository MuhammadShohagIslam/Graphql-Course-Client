/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { createOrUpdateUser } from "./../../functions/auth";

const CompleteRegistration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // redux disfatch
    const dispatch = useDispatch();
    // for redirect another page
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => ({ ...state }));
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
                navigate("/register/complete");
            }
        }
    }, [user, navigate]);

    useEffect(() => {
        const email = window.localStorage.getItem("emailForSignIn");
        console.log("e");
        if (email) {
            setEmail(email);
        }
    }, []);


   console.log("a")
    const handleSubmit = async (event) => {
        event.preventDefault();
        // validation
        if (!password || password.length < 6) {
            toast("Invalid Password");
            return;
        }
        setLoading(true);
        try {
            const result = await signInWithEmailLink(
                auth,
                email,
                window.location.href
            );

            if (result.user.emailVerified) {
                window.localStorage.removeItem("emailForSignIn");
                let user = auth.currentUser;
                await updatePassword(user, password);

                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                email: res.data.email,
                                name: res.data.name,
                                role: res.data.role,
                                token: idTokenResult.token,
                                _id: res.data._id,
                            },
                        });
                        setLoading(false);
                        toast.success("Registered Successfully!");
                        navigate("/");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } catch (error) {
            toast.error(`Registration is Failed for ${error}!`);
            setLoading(false);
        }
    };

    const completeRegisterForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={email}
                disabled
            />
            <hr></hr>
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                autoFocus
            />
            <br />
            <button
                type="submit"
                className="btn btn-outline-primary"
                disabled={password < 6 || loading}
            >
                {loading ? "Loading..." : "Complete Registration"}
            </button>
        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {completeRegisterForm()}
                </div>
            </div>
        </div>
    );
};

export default CompleteRegistration;
