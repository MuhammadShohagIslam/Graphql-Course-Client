import React from "react";
import { Form, Image } from "react-bootstrap";
import Resizer from "react-image-file-resizer";
import classes from "./FileUpload.module.css";
import { useMutation } from "@apollo/client";
import { PROFILE_UPDATE } from "../../../graphql/mutations";
import { toast } from "react-hot-toast";
import { useAuth } from "./../../../contexts/AuthProvider/AuthProvider";
import { UPLOAD_IMAGE, REMOVED_IMAGE } from "./../../../graphql/mutations";

const FileUpload = ({
    user,
    values,
    setValues,
    setLoading,
    loading,
    isProfileImageUpload = false,
}) => {
    const { userProfileUpdate, setLoading: setLoadingForFirebase } = useAuth();
    const [profileUpdate] = useMutation(PROFILE_UPDATE);
    const [uploadImage] = useMutation(UPLOAD_IMAGE, {
        update: (cache, data) => {
            if (isProfileImageUpload) {
                setValues({
                    ...values,
                    image: {
                        url: data.data?.uploadImage?.url,
                        public_id: data.data?.uploadImage?.public_id,
                    },
                });
                const newProfileObject = {
                    ...values,
                    image: {
                        url: data.data?.uploadImage?.url,
                        public_id: data.data?.uploadImage.public_id,
                    },
                };

                profileUpdate({
                    variables: {
                        input: newProfileObject,
                    },
                });
                updateTheProfileToFirebase(
                    values.fullName,
                    data.data?.uploadImage?.url
                );
            } else {
                setValues({
                    ...values,
                    img: {
                        url: data.data?.uploadImage?.url,
                        public_id: data.data?.uploadImage.public_id,
                    },
                });
            }
            setLoading(false);
        },
        onError: (error) => {
            setLoading(false);
        },
    });
    const [removeImage] = useMutation(REMOVED_IMAGE, {
        update: (cache, data) => {
            if (user) {
                setValues({
                    ...values,
                    img: {
                        url: "",
                        public_id: "",
                    },
                });
            }
        },
    });
    const handleFileChange = (event) => {
        setLoading(true);
        let fileInput = false;
        if (event.target.files[0]) {
            fileInput = true;
        }
        if (fileInput) {
            Resizer.imageFileResizer(
                event.target.files[0],
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    uploadImage({
                        variables: {
                            uploadImageFile: uri,
                        },
                    });
                },
                "base64"
            );
        }
    };
    const handleImageRemove = (public_id) => {
        if (user) {
            removeImage({
                variables: {
                    publicId: public_id,
                },
            });
        }
    };

    const updateTheProfileToFirebase = (fullName, photoImage) => {
        const profile = {
            displayName: fullName,
            photoURL: photoImage,
        };
        userProfileUpdate(profile)
            .then((result) => {
                setLoadingForFirebase(false);
            })
            .catch((error) => {
                toast.error(error);
            })
            .finally(() => {
                setLoadingForFirebase(false);
            });
    };

    return (
        <>
            <Form.Group className="mb-3 position-relative" controlId="image">
                {values.img && !isProfileImageUpload && (
                    <>
                        <span
                            className={classes.previewCrossIcon}
                            onClick={() =>
                                handleImageRemove(values?.img.public_id)
                            }
                        >
                            X
                        </span>
                        <Image
                            className={classes.previewServiceImage}
                            src={
                                values.img?.url
                                    ? values.img?.url
                                    : "https://via.placeholder.com/200x200.png?text=Service-Image"
                            }
                            alt={values?.name}
                        />
                    </>
                )}
                {values.image && isProfileImageUpload && (
                    <div className={classes.previewImageWrapper}>
                        <Image
                            className={classes.previewImage}
                            src={values?.image.url}
                            alt={values?.username}
                        />
                    </div>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
                <Form.Label className={classes.uploadButton}>
                    <Form.Control
                        hidden
                        accept="image/*"
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    />

                    {loading
                        ? "Uploading "
                        : isProfileImageUpload
                        ? "Profile Upload"
                        : "Service Image Upload"}
                </Form.Label>
            </Form.Group>
        </>
    );
};

export default FileUpload;
