import React from "react";
import { Form, Image } from "react-bootstrap";
import Resizer from "react-image-file-resizer";
import { deletingImageFile, uploadingImageFile } from "../../../api/cloudinary";
import classes from "./FileUpload.module.css";
import { useMutation } from "@apollo/client";
import { PROFILE_UPDATE } from "../../../graphql/mutations";

const FileUpload = ({
    user,
    values,
    setValues,
    setLoading,
    loading,
    isProfileImageUpload = false,
}) => {
    const [profileUpdate] = useMutation(PROFILE_UPDATE);

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
                    uploadingImageFile(user.token, uri)
                        .then((res) => {
                            if (isProfileImageUpload) {
                                setValues({
                                    ...values,
                                    image: {
                                        url: res.data?.url,
                                        public_id: res.data?.public_id,
                                    },
                                });
                                const newProfileObject = {
                                    ...values,
                                    image: {
                                        url: res.data?.url,
                                        public_id: res.data?.public_id,
                                    },
                                };
                                profileUpdate({
                                    variables: {
                                        input: newProfileObject,
                                    },
                                });
                            }

                            setLoading(false);
                        })
                        .catch((error) => {
                            setLoading(false);
                            console.log(error);
                        });
                },
                "base64"
            );
        }
    };
    const handleImageRemove = (public_id) => {
        if (user) {
            setLoading(true);
            deletingImageFile(user.token, public_id)
                .then((res) => {
                    setValues({
                        ...values,
                        image: {
                            url: "",
                            public_id: "",
                        },
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
        }
    };
    return (
        <>
            <Form.Group className="mb-3" controlId="image">
                {values.image && (
                    <div className={classes.previewImageWrapper}>
                        <Image
                            className={classes.previewImage}
                            src={values.image?.url}
                            alt=""
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
