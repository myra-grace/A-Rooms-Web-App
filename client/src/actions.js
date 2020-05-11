export const chatWindow = () => ({
    type: 'CHAT_WINDOW',
});

//---------------------------------- USER ----------------------------------

export const requestUserData = (user) => ({
    type: 'REQUEST_USER_DATA',
    user,
})

export const receiveUserData = (user) => ({
    type: 'RECEIVE_USER_DATA',
    user,
})

export const receiveUserDataError = () => ({
    type: 'RECEIVE_USER_DATA_ERROR',
})

//---------------------------------- ROOM ----------------------------------

export const createRoom = (room) => ({
    type: 'CREATE_ROOM',
    room,
})

export const requestRoomData = (room) => ({
    type: 'REQUEST_ROOM_DATA',
    room,
})

export const receiveRoomData = (room) => ({
    type: 'RECEIVE_ROOM_DATA',
    room,
})

export const receiveRoomDataError = () => ({
    type: 'RECEIVE_ROOM_DATA_ERROR',
})
