export default {
    auth: {
        __typename: "Authentication",
        loggedIn: false,
    },
    localUser: {
        __typename: "LocalUser",
        timestamp: 0
    },
    googleMaps: {
        __typename: "GoogleMapsAPI",
        isLoaded: false
    }
};