import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SnakeGame from '../media/games/SnakeGame';
import Telestrations from '../media/games/Telestrations';
import firebase from 'firebase';

const GameRenderer = (props) => { //props passed down is 1 step behind when finally reloads
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    // const game = useSelector(state => state.gameReducer.game);
    // retrieve game name from db rooms/roomID/queue[0]
    //in render, if this game, show it's component : null

    let game = props.gameTitle;

    return (
        <Wrapper>
            {game == "Telestrations" ?
            <Telestrations currentMedia={props.currentMedia} myQueuedIDs={props.myQueuedIDs}/> : null
            }
            {game == "Snake" ?
            <SnakeGame currentMedia={props.currentMedia} myQueuedIDs={props.myQueuedIDs}/> : null
            }
        </Wrapper>
    )
};

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    //scroll thingy
    //overflow thing
`;

export default GameRenderer;