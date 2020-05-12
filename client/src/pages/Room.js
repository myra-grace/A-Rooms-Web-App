import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Media from '../media/Media';
import Chat from '../components/Chat';
import Games from '../components/Games';
import Share from '../media/Share';

import { receiveUserData } from '../actions';

import { Icon } from 'react-icons-kit';
import { messageSquare } from 'react-icons-kit/feather/messageSquare';
import {ic_stop_screen_share} from 'react-icons-kit/md/ic_stop_screen_share'
import {ic_screen_share} from 'react-icons-kit/md/ic_screen_share'
import {share} from 'react-icons-kit/feather/share'

import {xFeather} from 'react-icons-kit/feather/x'
import {x} from 'react-icons-kit/oct/x'
import {androidClose} from 'react-icons-kit/ionicons/androidClose'
import {ic_close} from 'react-icons-kit/md/ic_close'
import {ic_cancel} from 'react-icons-kit/md/ic_cancel'
import {cross} from 'react-icons-kit/icomoon/cross'
//queue icon and funcionality in chat box

import { video } from 'react-icons-kit/feather/video';
import { videoOff } from 'react-icons-kit/feather/videoOff';
import { mic } from 'react-icons-kit/feather/mic';
import { micOff } from 'react-icons-kit/feather/micOff';
import {basic_joypad} from 'react-icons-kit/linea/basic_joypad'
import Queue from '../components/Queue';

//--------------------------------------------------------------------------


const Room = () => {
    const [showChat, setShowChat] = useState(true)
    const [showGames, setShowGames] = useState(true)
    const [showShare, setShowShare] = useState(true)
    // const [screenShareButton, setScreenShareButton] = useState(ic_stop_screen_share)
    const [videoButton, setVideoButton] = useState(videoOff)
    const [shareButton, setShareButton] = useState(share)
    const [micButton, setMicButton] = useState(micOff)
    const userVideo = useSelector(state => state.userReducer.video)
    const userMic = useSelector(state => state.userReducer.mic)
    const dispatch = useDispatch();

    //concider room ID
    //if not signed in redirect to sign-in
    //make sure state mic and video is false on leave?

    const chatClick = () => {
        console.log('chatClick');
        if (showChat === false) {
            setShowChat(true);
        } else {
            setShowChat(false);
        }
    }

    const videoClick = () => {
        console.log('videoClick');
        if (videoButton === videoOff) {
            setVideoButton(video)
        } else {
            setVideoButton(videoOff)
        }
        // userMic ? dispatch((receiveUserData(false)).video) : dispatch((receiveUserData(true)).video); //HELP
    }

    const shareClick = () => {
        //if share screen, change icon to x
        console.log('screen share Click');
        if (showShare === false) {
            setShowShare(true);
        } else {
            setShowShare(false);
        }
        // if (screenShareButton === ic_stop_screen_share) {
        //     setScreenShareButton(ic_screen_share)
        // } else {
        //     setScreenShareButton(ic_stop_screen_share)
        // }
        // userMic ? dispatch((receiveUserData(false)).screen) : dispatch((receiveUserData(true)).screen); //HELP
    }

    const micClick = () => {
        console.log('micCheck');
        if (micButton === micOff) {
            setMicButton(mic)
        } else {
            setMicButton(micOff)
        }
        // userMic ? dispatch(receiveUserData(false)) : dispatch(receiveUserData(true)); //HELP
    }

    const gamesClick = () => {
        console.log('gamesClick');
        if (showGames === false) {
            setShowGames(true);
        } else {
            setShowGames(false);
        }
    }


    return (
        <Wrapper>
            <MediaDiv>
                <Media />
            </MediaDiv>

            {showChat ? null :
            <ChatWrapper>
                <QueueDiv>
                    <Queue />
                </QueueDiv>
                <ChatDiv>
                    <Chat />
                </ChatDiv>
            </ChatWrapper>
            }

            {showGames ? null :
            <GamesDiv>
                <Games />
            </GamesDiv>
            }

            {showShare ? null :
            <ShareDiv>
                <Share />
            </ShareDiv>
            }

            <NavDiv>
                <MyButton onClick={chatClick}><Icon icon={messageSquare} /></MyButton>
                <MyButton onClick={shareClick}><Icon icon={shareButton} /></MyButton>
                <MyButton onClick={videoClick}><Icon icon={videoButton} /></MyButton>
                <MyButton onClick={micClick}><Icon icon={micButton} /></MyButton>
                <MyButton onClick={gamesClick}><Icon size={20} icon={basic_joypad} /></MyButton>
            </NavDiv>
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

const ChatWrapper = styled.div`
    width: 30%;
    height: 95%;
    background-color: blue;
    position: absolute;
    left: 0;
    bottom: 5%;

    display: flex;
    flex-direction: column;

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

const ChatDiv = styled.div`
    flex-grow: 3; 
    background-color: red;
`;

const QueueDiv = styled.div`
    flex-grow: 1; 
    background-color: orange;
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

const ShareDiv = styled.div`
    border: 3px solid #d0ded8;
    border-radius: 8px;
    box-shadow: 0 0 10px 5px #588b76;
    background-color: #588b76;
    width: 50%;
    height: 50%;
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Room;