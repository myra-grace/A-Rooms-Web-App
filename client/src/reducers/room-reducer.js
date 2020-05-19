const initialState = {
    status: 'idle',
    roomID: null,
    game: null,
    sharedFiles: [],
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

        case 'SHARE_FILE': {
            return {
                ...state,
                status: 'Recieved file',
                sharedFiles: [...state.sharedFiles, action.sharedFile],
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
                sharedFiles: action.sharedFiles,
                screenShare: action.screenShare
            };
        }

        case 'RECEIVE_ROOM_DATA': {
            return {
                ...state,
                status: 'found room',
                roomID: action.roomID,
                game: action.game,
                sharedFiles: action.sharedFiles,
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