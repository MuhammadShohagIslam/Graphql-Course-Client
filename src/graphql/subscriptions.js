import { gql } from "@apollo/client";
import { SERVICE_FIELD } from "./fragments";


/* ----------------- Service Subscription ---------------------------- */
export const SERVICE_CREATED_SUBSCRIPTION = gql`
    subscription ServiceAdded {
        serviceAdded {
            ...CoreServiceFields
        }
    }
    ${SERVICE_FIELD}
`;

export const SERVICE_UPDATED_SUBSCRIPTION = gql`
    subscription ServiceUpdated {
        serviceUpdated {
            ...CoreServiceFields
        }
    }
    ${SERVICE_FIELD}
`;

export const SERVICE_REMOVED_SUBSCRIPTION = gql`
    subscription ServiceRemoved {
        serviceRemoved {
            ...CoreServiceFields
        }
    }
    ${SERVICE_FIELD}
`;
