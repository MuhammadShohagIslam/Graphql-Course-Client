import { gql } from "@apollo/client";
import { REVIEW_FIELD, SERVICE_FIELD } from "./fragments";

export const GET_ALL_SERVICES_BY_PAGE = gql`
    query GetAllServiceByPage($page: Int!) {
        getAllServiceByPage(page: $page) {
            servicesByPagination {
                ...CoreServiceFields
            }
            totalService
        }
    }
    ${SERVICE_FIELD}
`;

export const GET_ALL_SERVICES_UNDER_THE_LIMIT = gql`
    query GetAllServicesUnderLimit($limit: Int) {
        getAllServicesUnderLimit(limit: $limit) {
            ...CoreServiceFields
        }
    }
    ${SERVICE_FIELD}
`;

export const GET_SERVICE_BY_ID = gql`
    query GetService($serviceId: ID!) {
        getService(serviceId: $serviceId) {
            ...CoreServiceFields
        }
    }
    ${SERVICE_FIELD}
`;

export const GET_ALL_REVIEWS_UNDER_QUERY = gql`
    query GetAllReview($query: ID) {
        getAllReview(query: $query) {
            star
        }
    }
`;

export const GET_REVIEWS_BY_SERVICE_ID = gql`
    query GetAllReview($query: ID) {
        getAllReview(query: $query) {
            ...CoreReviewFields
        }
    }
    ${REVIEW_FIELD}
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

export const GET_SINGLE_REVIEW = gql`
    query GetReview($reviewId: ID!) {
        getReview(reviewId: $reviewId) {
            email
            ...CoreReviewFields
        }
    }
    ${REVIEW_FIELD}
`;
