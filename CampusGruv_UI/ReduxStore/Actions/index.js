//Write all action creaters here with named exports

export  const CreateUserDetails = (userObject) => {
    return {
        type:"CREATE_USER_DETAILS",
        payload:userObject
    }
}

export const connectSocket = (payload) => {
    return {
        type: "CONNECT_TO_SOCKET",
        payload: payload
    }
}