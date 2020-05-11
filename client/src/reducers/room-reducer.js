const initialState = {
    status: 'idle',
    room: null,
}

const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_ROOM': {
            return {
                ...state,
                status: 'creating a room',
                room: action.room,
            };
        }

        case 'REQUEST_ROOM_DATA': {
            return {
                ...state,
                status: 'checking for room',
                room: action.room,
            };
        }

        case 'RECEIVE_ROOM_DATA': {
            return {
                ...state,
                status: 'found room',
                room: action.room
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