import React, { useState, useMemo, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import omitDeep from "omit-deep";
import { toast } from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
// import Swal from "sweetalert2";
import { useMutation, useQuery } from "@apollo/client";
import { PROFILE_UPDATE } from "../../../../graphql/mutations";
import Dashboard from "../../../../layout/Dashboard/Dashboard";
import FileUpload from "../../../../components/shared/FileUpload/FileUpload";
import { useAuth } from "./../../../../contexts/AuthProvider/AuthProvider";
import { GET_CURRENT_USER } from "./../../../../graphql/queries";
import ProfileEditModal from "./../../../../components/shared/ProfileEditModal/ProfileEditModal";
import classes from "./Profile.module.css";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [loadingForUpdateProfile, setLoadingForUpdateProfile] = useState(false);
    const [loadingForUpdateProfileImg, setLoadingForUpdateProfileImg] = useState(false);
    const [values, setValues] = useState({
        username: "",
        fullName: "",
        image: {
            public_id: "",
            url: "",
        },
        email: "",
        about: "",
    });

    const { state, userProfileUpdate,setLoading } = useAuth();
    const { user } = state;

    const { data, refetch } = useQuery(GET_CURRENT_USER);

    useMemo(() => {
        if (data) {
            setValues({
                ...values,
                username: data.currentUser.username,
                fullName: data.currentUser.fullName,
                image: {
                    url: data.currentUser.image?.url,
                    public_id: data.currentUser.image?.public_id,
                },
                email: data.currentUser.email,
                about: data.currentUser.about,
            });
        }
    }, [data]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const [profileUpdate] = useMutation(PROFILE_UPDATE, {
        update: ({ data }) => {
            toast.success("Profile Updated Successfully!");
        },
    });

    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadingForUpdateProfile(true);
        profileUpdate({
            variables: {
                input: values,
            },
        });
        refetch();
        setLoadingForUpdateProfile(false);
        updateTheProfileToFirebase(values.fullName, values.image?.url);
    };

    const updateTheProfileToFirebase = (fullName, photoImage) => {
        const profile = {
            displayName: fullName,
            photoURL: photoImage,
        };
        userProfileUpdate(profile)
            .then((result) => {
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error);
            }).finally(()=>{
                setLoading(false);
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
                <title>Profile</title>
            </Helmet>
            <Container className="my-5">
                <h2 className="text-white text-center mb-4">
                    Profile Information
                </h2>
                <Row className="m-0">
                    <Col lg={3} className="m-auto bg-dark p-lg-5 p-4">
                        <FileUpload
                            user={user}
                            values={values}
                            setValues={setValues}
                            setLoading={setLoadingForUpdateProfileImg}
                            isProfileImageUpload={true}
                            loading={loadingForUpdateProfileImg}
                        />
                    </Col>
                    <Col lg={9} className="m-auto bg-dark p-lg-5 p-4">
                        <div className="position-relative">
                            <span
                                className={classes.editIcon}
                                onClick={handleShowModal}
                            >
                                <BiEdit/>
                            </span>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <p className="text-white mb-0">
                                        Full name:
                                    </p>
                                    <span className="text-white mt-2 d-inline-block">
                                        {values?.fullName}
                                    </span>
                                </li>
                                <li className="mt-2">
                                    <p className="text-white mb-0">
                                        Email address:
                                    </p>
                                    <span className="text-white mt-2 d-inline-block">
                                        {values?.email}
                                    </span>
                                </li>
                                <li className="mt-2">
                                    <p className="text-white mb-0">About</p>
                                    <span className="text-white mt-2 d-inline-block">
                                        {values?.about}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ProfileEditModal
                showModal={showModal}
                setShowModal={setShowModal}
                handleShowModal={handleShowModal}
                handleSubmit={handleSubmit}
                values={values}
                user={user}
                loading={loadingForUpdateProfile}
                handleChange={handleChange}
                modalName="Profile Information Update"
            />
        </Dashboard>
    );
};

export default Profile;
