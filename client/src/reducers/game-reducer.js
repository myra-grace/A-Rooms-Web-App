const initialState = {
    status: 'idle',
    game: "",
    input: "",
}

const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GAME_NAME': {
            return {
                ...state,
                status: 'selected a game',
                game: action.game,
            };
        }
        case 'STORE_INPUT': {
            return {
                ...state,
                status: 'sent input',
                game: 'Telestrations',
                input: action.input,
            };
        }
        case 'STORE_INPUT_DAS': {
            return {
                ...state,
                status: 'sent input',
                game: 'DrawStory',
                input: action.input,
            };
        }
    
        default:
            return state;
    }
}

export default roomReducer;