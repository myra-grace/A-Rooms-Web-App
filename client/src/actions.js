export const chatWindow = () => ({
    type: 'CHAT_WINDOW',
});

//---------------------------------- USER ----------------------------------

export const requestUserData = (user, video, mic) => ({
    type: 'REQUEST_USER_DATA',
    user,
    video,
    mic,
})

export const receiveUserData = (username, video, mic) => ({
    type: 'RECEIVE_USER_DATA',
    user: username,
    video,
    mic,
})

export const receiveUsername = (username) => ({
    type: 'RECEIVE_USERNAME',
    username
})

export const receiveUserAvatar = (userAvatar) => ({
    type: 'RECEIVE_USER_AVATAR',
    userAvatar
})

export const shareScreenToggle = (shareScreen) => ({
    type: 'SHARE_SCREEN_TOGGLE',
    shareScreen
})

export const videoToggle = (video) => ({
    type: 'VIDEO_TOGGLE',
    video
})

export const micToggle = (mic) => ({
    type: 'MIC_TOGGLE',
    mic
})

export const receiveUserDataError = () => ({
    type: 'RECEIVE_USER_DATA_ERROR',
})

//---------------------------------- ROOM ----------------------------------

export const createRoom = (roomID, createJoin) => ({
    type: 'CREATE_ROOM',
    roomID,
    createJoin,
})

export const joinRoom = (roomID, createJoin) => ({
    type: 'JOIN_ROOM',
    roomID,
    createJoin,
})

export const roomGameSelection = (game) => ({
    type: 'ROOM_GAME_SELECTION',
    game,
})

export const exitRoom = (roomID) => ({
    type: 'EXIT_ROOM',
    roomID,
})

export const requestRoomData = (roomID) => ({
    type: 'REQUEST_ROOM_DATA',
    roomID,
})

export const receiveRoomData = (roomID) => ({
    type: 'RECEIVE_ROOM_DATA',
    roomID,
})

export const receiveRoomDataError = () => ({
    type: 'RECEIVE_ROOM_DATA_ERROR',
})
