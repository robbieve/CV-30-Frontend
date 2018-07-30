import gql from 'graphql-tag';

export const IS_AUTHENTICATED = gql`
    query {
        auth @client {
            __typename
            loggedIn
            currentUser
        }
    }
`;

export const AuthenticateLocal = gql`
    mutation setAuthenticated($user: User) {
        setAuthenticated(status: true, user: $user) @client
    }
`;

export const updateAvatarTimestampMutation = gql`
    mutation updateAvatarTimestamp($timestamp: Int!){
        updateAvatarTimestamp(timestamp: $timestamp) @client{
           localUser {
               __typename
               timestamp
           }
        }
    }
`;

export const localUserQuery = gql`
    query localUserQuery {
        localUser @client {
            timestamp
        }
    }
`;


export const getCurrentUser = gql`
    query getCurrentUser {
        auth @client {
             __typename
            currentUser {
                id
                firstName
                lastName
                email
                hasAvatar
                avatarContentType
                 __typename
            }
        }
    }
`;

export const setEditMode = gql`
    mutation setEditMode($status: Boolean!) {
        setEditMode(status: $status) @client {
            __typename,
            status
        }
    }
`;

export const resetEditMode = gql`
    mutation resetEditMode {
        resetEditMode @client {
            __typename,
            status
        }
    }
`;

export const getEditMode = gql`
query getEditMode {
    editMode @client {
        __typename
        status
    }
}
`;