import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Media from '../media/Media';
import Chat from '../components/Chat';
import GamesSelector from '../components/GamesSelector';
import Share from '../media/Share';
import firebase from 'firebase';
import { GeneralWrapper } from '../components/GlobalStyles';

import { receiveUserData, 
    receiveUsername, 
    chatDivToggle,
    shareDivToggle, 
    videoToggle, 
    micToggle,
gamesDivToggle } from '../actions';

import { Icon } from 'react-icons-kit';
import { messageSquare } from 'react-icons-kit/feather/messageSquare';
import {ic_stop_screen_share} from 'react-icons-kit/md/ic_stop_screen_share'
import {ic_screen_share} from 'react-icons-kit/md/ic_screen_share'
import {share} from 'react-icons-kit/feather/share'

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
    const chatDiv = useSelector(state => state.userReducer.chatDiv)
    const userMic = useSelector(state => state.userReducer.mic)
    const userVideo = useSelector(state => state.userReducer.video)
    const shareDiv = useSelector(state => state.userReducer.shareDiv)
    const gamesDiv = useSelector(state => state.userReducer.gamesDiv)
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [showChat, setShowChat] = useState(false)
    const [showGames, setShowGames] = useState(false)
    const [showShare, setShowShare] = useState(false)
    // const [screenShareButton, setScreenShareButton] = useState(ic_stop_screen_share)
    const [videoButton, setVideoButton] = useState(videoOff)
    const [shareButton, setShareButton] = useState(share)
    const [micButton, setMicButton] = useState(micOff)


    if (status !== "signed-in") {
        history.push(`/`);
    }

    useEffect(() => {
        if (chatDiv === true) {
            setShowChat(true);
        } else {
            setShowChat(false);
        }
    }, [chatDiv])

    const chatClick = () => {
        dispatch(chatDivToggle(!chatDiv))
    }

    useEffect(() => {
        if (shareDiv === true) {
            setShowShare(true);
        } else {
            setShowShare(false);
        }
    }, [shareDiv])

    const shareClick = () => {
        dispatch(shareDivToggle(!shareDiv))
    }

    const videoClick = () => {
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

    useEffect(() => {
        if (gamesDiv === true) {
            setShowGames(true);
        } else {
            setShowGames(false);
        }
    }, [gamesDiv])
        
    const gamesClick = () => {
        dispatch(gamesDivToggle(!gamesDiv));
    }

//HELP
    const removeUser = (event) => {
        // if only user, remove whole room, else
        // roomsRef.child(`${roomID}`).child("userIDs").child(`${userID}`).onDisconnect().remove();
    }    

    roomsRef.child(`${roomID}`).child("userIDs").child(`${userID}`).onDisconnect().remove();

    

    return (
        <GeneralWrapper>
            <MediaDiv>
                <Media />
            </MediaDiv>

            {!showChat ? null :
            <ChatWrapper>
                <QueueDiv>
                    <Queue />
                </QueueDiv>
                <ChatDiv>
                    <Chat />
                </ChatDiv>
            </ChatWrapper>
            }

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
        </GeneralWrapper>
    )
};

//---------------------------------- STYLES ----------------------------------

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
    max-width: 75%;
    height: 95%;
    position: absolute;
    left: 0;
    bottom: 5%;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    z-index: 5;
`;

const QueueDiv = styled.div`
    grid-area: 1 / 1 / 2 / 2; 
    overflow-x: auto;
    overflow-anchor: none;
    
    &::-webkit-scrollbar {
        width: 0;
        display: none;
    }
`;

const ChatDiv = styled.div`
    grid-area: 2 / 1 / 5 / 2; 
`;

const GamesDiv = styled.div`
    width: 30%;
    height: 95%;
    position: absolute;
    right: 0;
    bottom: 5%;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    z-index: 5;
`;

const ShareDiv = styled.div`
    border: 3px solid #FFD5FF;
    border-radius: 0 20px 0;
    box-shadow: 0 0 10px 5px magenta;
    background-color: rgb(0, 0, 0, 0.7);
    width: 50%;
    height: 50%;
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
`;

export default Room;