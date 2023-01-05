import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { updatePassword } from "firebase/auth";
import { useSelector } from "react-redux";
import AdminNavigation from "../../components/navigation/AdminNavigation";
import UserNavigation from "../../components/navigation/UserNavigation";

const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state)=> ({...state}));

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
        updatePassword(auth.currentUser, newPassword)
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

    const updatePasswordForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter Your New Password"
                autoFocus
            />
            <br />
            <button type="submit" className="btn btn-outline-primary"  disabled={loading || newPassword.length < 6}>
                {loading ? "Loading..." : "Submit"}
            </button>
        </form>
    );
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    {user && user.role === "admin" ? (
                        <AdminNavigation/>
                    ): (
                        <UserNavigation/>
                    )}
                </div>
                <div className="col-md-8 pt-5">
                    {loading ? <h2>Loading</h2> : <h4>Update Password</h4>}
                    {updatePasswordForm()}
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
