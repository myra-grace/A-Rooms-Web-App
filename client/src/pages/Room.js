import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Media from '../media/Media';
import Chat from '../components/Chat';
import GamesSelector from '../components/GamesSelector';
import Share from '../media/Share';
import firebase from 'firebase';

import { receiveUserData, 
    receiveUsername, 
    shareScreenToggle, 
    videoToggle, 
    micToggle } from '../actions';

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
    const database = firebase.database();
    const usersRef = database.ref('users');
    const roomsRef = database.ref('rooms');
    const roomID = useSelector(state => state.roomReducer.roomID);
    const userID = useSelector(state => state.userReducer.id);
    const status = useSelector(state => state.userReducer.status)
    const userMic = useSelector(state => state.userReducer.mic)
    const userVideo = useSelector(state => state.userReducer.video)
    const userScreen = useSelector(state => state.userReducer.shareScreen)
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [showChat, setShowChat] = useState(false)
    const [showGames, setShowGames] = useState(false)
    const [showShare, setShowShare] = useState(false)
    // const [screenShareButton, setScreenShareButton] = useState(ic_stop_screen_share)
    const [videoButton, setVideoButton] = useState(videoOff)
    const [shareButton, setShareButton] = useState(share)
    const [micButton, setMicButton] = useState(micOff)
    // const userVideo = user.video;
    // console.log('userVideo: ', userVideo);
    
    //concider room ID
    //if not signed in redirect to sign-in
    //make sure state mic and video is false on leave?

    if (status !== "signed-in") {
        history.push(`/`);
    }

    const chatClick = () => {
        console.log('chatClick');
        if (showChat === false) {
            setShowChat(true);
        } else {
            setShowChat(false);
        }
    }

    const shareClick = () => {
        //if share screen, change icon to x
        console.log('screen share Click');
        if (userScreen === false) {
            setShowShare(true);
        } else {
            setShowShare(false);
        }
        // if (screenShareButton === ic_stop_screen_share) {
        //     setScreenShareButton(ic_screen_share)
        // } else {
        //     setScreenShareButton(ic_stop_screen_share)
        // }
        dispatch(shareScreenToggle(!userScreen))
    }

    const videoClick = () => {
        console.log('videoClick');
        if (userVideo === false) {
            setVideoButton(video)
        } else {
            setVideoButton(videoOff)
        }
        const newData = {
            video: !userVideo,
        };
        usersRef.child(`${userID}`).update(newData)
        dispatch(videoToggle(!userVideo))
    }

    const micClick = () => {
        console.log('micCheck');
        if (userMic === false) {
            setMicButton(mic)
        } else {
            setMicButton(micOff)
        }
        const newData = {
            mic: !userMic,
        };
        usersRef.child(`${userID}`).update(newData)
        dispatch(micToggle(!userMic))
    }

    const gamesClick = () => {
        console.log('gamesClick');
        if (showGames === false) {
            setShowGames(true);
        } else {
            setShowGames(false);
        }
    }

//HELP
    const removeUser = (event) => {
        // if only user, remove whole room, else
        // roomsRef.child(`${roomID}`).child("userIDs").child(`${userID}`).onDisconnect().remove();
    }    

    roomsRef.child(`${roomID}`).child("userIDs").child(`${userID}`).onDisconnect().remove();


    return (
        <Wrapper>
            <MediaDiv>
                <Media />
            </MediaDiv>

            {/* {!showChat ? null : */}
            <ChatWrapper>
                <QueueDiv>
                    <Queue />
                </QueueDiv>
                <ChatDiv>
                    <Chat />
                </ChatDiv>
            </ChatWrapper>
            {/* } */}

            {!showGames ? null :
            <GamesDiv>
                <GamesSelector />
            </GamesDiv>
            }

            {!showShare ? null :
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
    border-radius: 0 20px 0;
    box-shadow: 0 0 10px 5px #588b76;
    background-color: #588b76;
    width: 50%;
    height: 50%;
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

export default Room;