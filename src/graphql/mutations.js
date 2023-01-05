import { gql } from "@apollo/client";
import { REVIEW_FIELD, SERVICE_FIELD, USER_FIELD } from "./fragments";

/* ----- For Users -----  */
export const CREATE_NEW_USER = gql`
    mutation CreateNewUser($input: UserCreateInput!) {
        createNewUser(input: $input) {
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

/* ----- For Reviews -----  */
export const CREATE_NEW_REVIEW = gql`
    mutation CreateNewReview($input: CreateNewReviewInput!) {
        createNewReview(input: $input) {
            email
            ...CoreReviewFields
        }
    }
    ${REVIEW_FIELD}
`;

export const REMOVED_REVIEW = gql`
    mutation RemoveReview($reviewId: ID!) {
        removeReview(reviewId: $reviewId) {
            acknowledged
            deletedCount
        }
    }
`;

export const UPDATED_REVIEW = gql`
    mutation UpdateReview($reviewId: ID!, $input: UpdateReviewInput!) {
        updateReview(reviewId: $reviewId, input: $input) {
            acknowledged
            matchedCount
            modifiedCount
            upsertedCount
            upsertedId
        }
    }
`;
