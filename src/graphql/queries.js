import { gql } from "@apollo/client";
import { REVIEW_FIELD } from "./fragments";

export const GET_REVIEWS_BY_SERVICE_ID = gql`
    query GetAllReview($query: ID) {
        getAllReview(query: $query) {
            ...CoreReviewFields
        }
    }
    ${REVIEW_FIELD}
`;

export const GET_SERVICE_BY_ID = gql`
    query GetService($serviceId: ID!) {
        getService(serviceId: $serviceId) {
            _id
            name
            description
            img
            price
        }
    }
`;

export const GET_REVIEWS_BY_SPECIFIC_USER = gql`
    query GetReviewBySpecificUser($email: String!, $name: String) {
        getReviewBySpecificUser(email: $email, name: $name) {
            email
            ...CoreReviewFields
        }
    }
    ${REVIEW_FIELD}
`;
