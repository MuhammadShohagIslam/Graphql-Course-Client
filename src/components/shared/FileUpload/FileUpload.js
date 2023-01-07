import React from "react";
import { Form } from "react-bootstrap";

const FileUpload = ({ isProfileImageUpload = false }) => {
    return (
        <Form.Group className="mb-3" controlId="image">
            <Form.Label className="text-white">
                {isProfileImageUpload
                    ? "Profile Upload"
                    : "Service Image Upload"}
                <Form.Control
                    hidden
                    accept="image/*"
                    type="text"
                    name="image"
                    placeholder="Image"
                />
            </Form.Label>
        </Form.Group>
    );
};

export default FileUpload;
