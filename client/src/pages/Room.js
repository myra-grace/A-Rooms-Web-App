import React from 'react';
import styled from 'styled-components';
import Media from '../components/Media';
import Chat from '../components/Chat';
import Games from '../components/Games';

const Room = () => {
    //concider room ID
    //change buttons to icons

    const chatClick = () => {
        console.log('chatClick');
    }

    const cameraClick = () => {
        console.log('cameraClick');
    }

    const micClick = () => {
        console.log('micCheck');
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
                <button onClick={chatClick}>chat</button>
                <button onClick={cameraClick}>camera</button>
                <button onClick={micClick}>mic</button>
                <button onClick={gamesClick}>games</button>
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