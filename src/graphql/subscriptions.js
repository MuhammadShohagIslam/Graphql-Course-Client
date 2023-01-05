import { gql } from "@apollo/client";
import { REVIEW_FIELD, SERVICE_FIELD } from "./fragments";

export const SERVICE_CREATED_SUBSCRIPTION = gql`
    subscription ServiceCreated {
        serviceCreated {
            ...CoreServiceFields
        }
    }
    ${SERVICE_FIELD}
`;
