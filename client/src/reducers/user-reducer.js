const initialState = {
    status: 'idle',
    user: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_USER_DATA': {
            return {
                ...state,
                status: 'checking database',
                user: action.user,
            };
        }

        case 'RECEIVE_USER_DATA': {
            return {
                ...state,
                status: 'signed-in',
                user: action.user
            };
        }

        case 'RECEIVE_USER_DATA_ERROR': {
            return {
                ...state,
                status: 'user data error',
            };
        }
    
        default:
            return state;
    }
}

export default userReducer;