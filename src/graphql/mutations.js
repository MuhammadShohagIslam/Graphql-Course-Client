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
