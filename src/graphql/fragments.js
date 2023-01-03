import { gql } from "@apollo/client";

export const REVIEW_FIELD = gql`
    fragment CoreReviewFields on Review {
        _id
        _service
        name
        img
        serviceName
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
        img
        price
    }
`;
