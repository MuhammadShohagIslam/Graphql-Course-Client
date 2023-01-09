import { gql } from "@apollo/client";
import { REVIEW_FIELD, SERVICE_FIELD, USER_FIELD } from "./fragments";

/* -----------------  Users ---------------------------- */
export const GET_CURRENT_USER = gql`
    query CurrentUser {
        currentUser {
            ...CoreUserFields
        }
    }
    ${USER_FIELD}
`;
export const GET_IS_ADMIN_USER = gql`
    query Query {
        getAdminUser
    }
`;
export const GET_IS_USER = gql`
    query Query {
        getUser
    }
`;

/* -----------------  Services ---------------------------- */
export const GET_ALL_SERVICES = gql`
    query GetAllService($page: Int) {
        getAllService(page: $page) {
            ...CoreServiceFields
        }
    }
    ${SERVICE_FIELD}
`;

export const GET_TOTAL_SERVICES = gql`
    query TotalServices {
        totalServices
    }
`;

export const GET_SERVICE_BY_ID = gql`
    query GetService($serviceId: ID!) {
        getService(serviceId: $serviceId) {
            ...CoreServiceFields
        }
    }
    ${SERVICE_FIELD}
`;

export const GET_SEARCH_DATA = gql`
    query GetSearchResult($search: String!) {
        getSearchResult(search: $search) {
            ...CoreServiceFields
        }
    }
    ${SERVICE_FIELD}
`;

/* -----------------  Reviews ---------------------------- */

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
            ...CoreReviewFields
        }
    }
    ${REVIEW_FIELD}
`;

export const GET_SINGLE_REVIEW = gql`
    query GetReview($reviewId: ID!) {
        getReview(reviewId: $reviewId) {
            ...CoreReviewFields
        }
    }
    ${REVIEW_FIELD}
`;

/* -----------------  Blogs ---------------------------- */
export const GET_ALL_BLOGS = gql`
    query GetAllBlogs {
        getAllBlogs {
            _id
            title
            description
            author
            createdAt
        }
    }
`;
