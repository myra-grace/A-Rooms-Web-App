import { combineReducers } from 'redux';
import userReducer from './user-reducer'
import roomReducer from './room-reducer'
import chatReducer from './chat-reducer';

export default combineReducers({
    userReducer,
    roomReducer,
    chatReducer,
});