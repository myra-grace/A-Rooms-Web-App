const initialState = {
    chatWindow: false,
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHAT_WINDOW':{
            return {
                ...state,
                chatWindow: true,
            };
        }
    
        default:
            return state;
    }
}

export default chatReducer;