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

export const clearMsgs = () => {
    return {
        type: 'CLEAR_MSGS'
    }
}

export const clearNoti = () => {
    return {
        type: 'CLEAR_NOTI'
    }
}

export const unreadMsg = () => {
    return {
        type: 'EDIT_UNREAD_MSGS'
    }
}

export const unreadNoti = () => {
    return {
        type: 'EDIT_UNREAD_NOTI'
    }
}