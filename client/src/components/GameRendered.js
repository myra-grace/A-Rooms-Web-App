import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SnakeGame from '../media/games/SnakeGame';
import Telestrations from '../media/games/Telestrations';
import firebase from 'firebase';
import { GeneralWrapper } from '../components/GlobalStyles';


const GameRenderer = (props) => { //props passed down is 1 step behind when finally reloads
    const database = firebase.database();
    const roomsRef = database.ref('rooms');

    let game = props.gameTitle;

    console.log("LEFT", props.mediaContainerRefLeft);
    console.log("Top", props.mediaContainerRefTop);

    return (
        <GeneralWrapper>
            {game == "Telestrations" ?
            <Telestrations currentMedia={props.currentMedia} sharedFiles={props.sharedFiles}/> : null
            }
            {game == "Snake" ?
            <SnakeGame currentMedia={props.currentMedia} sharedFiles={props.sharedFiles}/> : null
            }
        </GeneralWrapper>
    )
};

//---------------------------------- STYLES ----------------------------------


export default GameRenderer;