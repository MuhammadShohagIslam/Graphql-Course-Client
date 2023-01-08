import { gql } from "@apollo/client";
import { SERVICE_FIELD } from "./fragments";


/* ----------------- Service Subscription ---------------------------- */
export const SERVICE_ADDED = gql`
    subscription ServiceAdded {
        serviceAdded {
            ...CoreServiceFields
        }
    }
    ${SERVICE_FIELD}
`;

export const SERVICE_UPDATED = gql`
    subscription ServiceUpdated {
        serviceUpdated {
            ...CoreServiceFields
        }
    }
    ${SERVICE_FIELD}
`;

export const SERVICE_REMOVED = gql`
    subscription ServiceRemoved {
        serviceRemoved {
            ...CoreServiceFields
        }
    }
    ${SERVICE_FIELD}
`;
