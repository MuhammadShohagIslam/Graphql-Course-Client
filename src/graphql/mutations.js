import { gql } from "@apollo/client";
import { REVIEW_FIELD } from "./fragments";

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
