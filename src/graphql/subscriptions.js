import { gql } from "@apollo/client";
import { REVIEW_FIELD } from "./fragments";

/* ----------------- Review Subscription ---------------------------- */
export const ADDED_REVIEW = gql`
    subscription AddedReview {
        addedReview {
            ...CoreReviewFields
        }
    }
    ${REVIEW_FIELD}
`;

export const UPDATED_REVIEW = gql`
    subscription UpdatedReview {
        updatedReview {
            ...CoreReviewFields
        }
    }
    ${REVIEW_FIELD}
`;

export const REMOVED_REVIEW = gql`
    subscription DeletedReview {
        deletedReview {
            ...CoreReviewFields
        }
    }
    ${REVIEW_FIELD}
`;
