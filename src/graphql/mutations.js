import { gql } from "@apollo/client";
import {
    REVIEW_FIELD,
    SERVICE_FIELD,
    USER_FIELD,
    UPDATED_FIELD,
    DELETED_FIELD,
} from "./fragments";

/* ----- For Users -----  */
export const CREATE_NEW_USER = gql`
    mutation CreateNewUser($input: UserCreateInput!) {
        createNewUser(input: $input) {
            username
            fullName
            email
        }
    }
`;

export const PROFILE_UPDATE = gql`
    mutation ProfileUpdate($input: ProfileUpdateInput!) {
        profileUpdate(input: $input) {
            ...CoreUserFields
        }
    }
    ${USER_FIELD}
`;

/* ----- For Service -----  */
export const CREATE_NEW_SERVICE = gql`
    mutation CreateNewService($input: CreateNewServiceInput!) {
        createNewService(input: $input) {
            ...CoreServiceFields
        }
    }
    ${SERVICE_FIELD}
`;

export const UPDATED_SERVICE = gql`
    mutation UpdateService($serviceId: ID!, $input: UpdateServiceInput!) {
        updateService(serviceId: $serviceId, input: $input) {
            ...CoreServiceFields
        }
    }
    ${SERVICE_FIELD}
`;

export const REMOVED_SERVICE = gql`
    mutation RemoveService($serviceId: ID!) {
        removeService(serviceId: $serviceId) {
            acknowledged
            deletedCount
        }
    }
`;

/* ----- For Reviews -----  */
export const CREATE_NEW_REVIEW = gql`
    mutation CreateNewReview($input: CreateNewReviewInput!) {
        createNewReview(input: $input) {
            ...CoreReviewFields
        }
    }
    ${REVIEW_FIELD}
`;

export const REMOVED_REVIEW = gql`
    mutation RemoveReview($reviewId: ID!) {
        removeReview(reviewId: $reviewId) {
            ...CoreDeletedFields
        }
    }
    ${DELETED_FIELD}
`;

export const REVIEW_UPDATED = gql`
    mutation ReviewUpdated($reviewId: ID!, $input: UpdateReviewInput!) {
        reviewUpdated(reviewId: $reviewId, input: $input) {
            ...CoreReviewFields
        }
    }
    ${REVIEW_FIELD}
`;
