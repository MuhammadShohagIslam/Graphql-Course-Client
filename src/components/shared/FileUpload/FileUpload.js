import React from "react";
import Resizer from "react-image-file-resizer";
import { Form, Image } from "react-bootstrap";
import classes from "./FileUpload.module.css";
import { deletingImageFile, uploadingImageFile } from "../../../api/cloudinary";

const FileUpload = ({
    user,
    values,
    setValues,
    setLoading,
    isProfileImageUpload = false,
}) => {
    
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
                            setValues({
                                ...values,
                                images: res.data,
                            });
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
                    const { image } = values;
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
                <Form.Label className="text-white">
                    {isProfileImageUpload
                        ? "Profile Upload"
                        : "Service Image Upload"}
                    <Form.Control
                        hidden
                        accept="image/*"
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    />
                </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
                {values.image && (
                    <div className={classes.previewImageWrapper}>
                        <span
                            className={classes.previewCrossIcon}
                            onClick={handleImageRemove}
                        >
                            X
                        </span>
                        <Image
                            className={classes.previewImage}
                            src={values.image}
                            alt=""
                        />
                    </div>
                )}
            </Form.Group>
        </>
    );
};

export default FileUpload;
