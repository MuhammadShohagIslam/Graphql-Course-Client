import axios from "axios";

export const uploadingImageFile = (token, uploadImageFile) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/upload-images`,
        { uploadImageFile },
        {
            headers: {
                authorization:token,
            },
        }
    );
};
export const deletingImageFile = (token, public_id) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/remove-images`,
        { public_id },
        {
            headers: {
                authorization:token,
            },
        }
    );
};
