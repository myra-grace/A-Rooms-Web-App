const initialState = {
    status: 'idle',
    roomID: null,
    game: null,
    shareFile: null,
    screenShare: null,
    createJoin: null,
}

const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_ROOM': {
            return {
                ...state,
                status: 'creating a room',
                createJoin: 'Create',
            };
        }

        case 'JOIN_ROOM': {
            return {
                ...state,
                status: 'joining room',
                createJoin: 'Join',
            };
        }

        case 'RECEIVE_ROOM_ID': {
            return {
                ...state,
                status: 'Saved ID',
                roomID: action.roomID,
            };
        }

        case 'RECEIVE_USER_TO_ROOM': {
            return {
                ...state,
                status: 'Entered room',
                user: action.user,
            };
        }
        
        case 'ROOM_GAME_SELECTION': {
            return {
                ...state,
                status: 'game selection',
                game: action.game
            };
        }

        case 'EXIT_ROOM': {
            return {
                ...state,
                status: 'exited room',
                roomID: null,
                createJoin: null,
            };
        }

        case 'REQUEST_ROOM_DATA': {
            return {
                ...state,
                status: 'checking for room',
                roomID: action.roomID,
                game: action.game,
                shareFile: action.shareFile,
                screenShare: action.screenShare
            };
        }

        case 'RECEIVE_ROOM_DATA': {
            return {
                ...state,
                status: 'found room',
                roomID: action.roomID,
                game: action.game,
                shareFile: action.shareFile,
                screenShare: action.screenShare,
                createJoin: action.createJoin,
            };
        }

        case 'RECEIVE_ROOM_DATA_ERROR': {
            return {
                ...state,
                status: 'room data error',
            };
        }
    
        default:
            return state;
    }
}

export default roomReducer;