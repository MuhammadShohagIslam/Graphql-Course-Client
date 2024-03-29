import { gql } from "@apollo/client";

export const USER_FIELD = gql`
    fragment CoreUserFields on User {
        _id
        about
        email
        fullName
        role
        username
        image {
            public_id
            url
        }
    }
`;

export const REVIEW_FIELD = gql`
    fragment CoreReviewFields on Review {
        _id
        _service {
            _id
            name
        }
        _user {
            _id
            fullName
            image {
                public_id
                url
            }
        }
        comment
        star
        createdAt
    }
`;

export const SERVICE_FIELD = gql`
    fragment CoreServiceFields on Service {
        _id
        name
        description
        img {
            public_id
            url
        }
        price
    }
`;

export const UPDATED_FIELD = gql`
    fragment CoreUpdatedFields on UpdatedReview {
        acknowledged
        matchedCount
        modifiedCount
        upsertedCount
        upsertedId
    }
`;

export const DELETED_FIELD = gql`
    fragment CoreDeletedFields on DeleteReview {
        acknowledged
        deletedCount
    }
`;
