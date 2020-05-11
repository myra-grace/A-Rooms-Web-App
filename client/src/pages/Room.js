import React, { useSelector } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Media from '../components/Media';
import Chat from '../components/Chat';
import Games from '../components/Games';

import { receiveUserData } from '../actions';

import { Icon } from 'react-icons-kit';
import { messageSquare } from 'react-icons-kit/feather/messageSquare';
import { video } from 'react-icons-kit/feather/video';
import { videoOff } from 'react-icons-kit/feather/videoOff';
import { mic } from 'react-icons-kit/feather/mic';
import { micOff } from 'react-icons-kit/feather/micOff';
// import { joyPad } from 'react-icons-kit/linea/basic_joypad';



const Room = () => {
    // const userVideo = useSelector(state => state.userReducer.video)
    // const userMic = useSelector(state => state.userReducer.mic)
    const dispatch = useDispatch();

    //concider room ID
    //change buttons to icons

    const chatClick = () => {
        console.log('chatClick');
    }

    const videoClick = () => {
        console.log('cameraClick');
        //userMic ? dispatch(receiveUserData(false)) : dispatch(receiveUserData(true)); //HELP
    }

    const micClick = () => {
        console.log('micCheck');
        //userMic ? dispatch(receiveUserData(false)) : dispatch(receiveUserData(true)); //HELP
    }

    const gamesClick = () => {
        console.log('gamesClick');
    }

    return (
        <Wrapper>
            <MediaDiv>
                <Media />
            </MediaDiv>
            <NavDiv>
                <MyButton onClick={chatClick}><Icon icon={messageSquare} /></MyButton>
                <MyButton onClick={videoClick}><Icon icon={video} /></MyButton>
                <MyButton onClick={micClick}><Icon icon={mic} /></MyButton>
                <MyButton onClick={gamesClick}>games</MyButton>
            </NavDiv>
            <ChatDiv>
                <Chat />
            </ChatDiv>
            <GamesDiv>
                <Games />
            </GamesDiv>
        </Wrapper>
    )
};

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100vw;
    height: 100wh;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const MediaDiv = styled.div`
    width: 90%;
    height: 90%;
    background-color: black;
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const NavDiv = styled.div`
    width: 100%;
    height: 5%;
    background-color: red;
    position: absolute;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const MyButton = styled.button`
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    color: #c4b1ab;
`;

const ChatDiv = styled.div`
    width: 30%;
    height: 95%;
    background-color: blue;
    position: absolute;
    left: 0;
    bottom: 5%;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

//     .fadeOut{
//         opacity:0;
//         width:0;
//         height:0;
//         transition: width 0.5s 0.5s, height 0.5s 0.5s, opacity 0.5s;
   
//    }
//    .fadeIn{
//         opacity:1;
//         width:100px;
//         height:100px;
//         transition: width 0.5s, height 0.5s, opacity 0.5s 0.5s;
   
//    }
`;

const GamesDiv = styled.div`
    width: 30%;
    height: 95%;
    background-color: blue;
    position: absolute;
    right: 0;
    bottom: 5%;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

export default Room;