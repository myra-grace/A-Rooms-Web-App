import { combineReducers } from 'redux';
import userReducer from './user-reducer'
import roomReducer from './room-reducer'
import gameReducer from './game-reducer';

export default combineReducers({
    userReducer,
    roomReducer,
    gameReducer,
});