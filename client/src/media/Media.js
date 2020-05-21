import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';

import { Icon } from 'react-icons-kit';
import {xFeather} from 'react-icons-kit/feather/x'
import {x} from 'react-icons-kit/oct/x'
import {androidClose} from 'react-icons-kit/ionicons/androidClose'
import {ic_close} from 'react-icons-kit/md/ic_close'
import {ic_cancel} from 'react-icons-kit/md/ic_cancel'
import {cross} from 'react-icons-kit/icomoon/cross'
//queue icon and funcionality in chat box

//---------------------------------- GAMES ----------------------------------

import SnakeGame from './games/SnakeGame';
import GameRenderer from '../components/GameRendered';
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------

const Media = () => {
    const storage = firebase.storage();
    const storageRoomsRef = storage.ref('rooms');
    const database = firebase.database();
    const usersRef = database.ref('users');
    const roomsRef = database.ref('rooms');
    const roomID = useSelector(state => state.roomReducer.roomID);
    const userID = useSelector(state => state.userReducer.id);
    const [itemsInQueueArray, setItemsInQueueArray] = useState([]);
    const [queueIDs, setQueueIDs] = useState([]);

    //render queue item at first place in here
    //New component for selecting from queue?
    //object-fit: cover everything? No, fitinto


    const handleReceiveQueue = (item) => {
        setItemsInQueueArray(itemsInQueueArray.concat(item));
    }
    const handleReceiveIDs = (id) => {
        setQueueIDs(queueIDs.concat(id));
    }

    useEffect(() => {
        const QueueArray = [];
        const IDs = [];
        roomsRef.child(`${roomID}`).child("queue").on('child_added', snapshot => {
            let queuedItem = {};
            queuedItem = snapshot.val();
            QueueArray.push(queuedItem);
            IDs.push(snapshot.key);
            setItemsInQueueArray([]);
            setQueueIDs([]);
            handleReceiveQueue(QueueArray);
            handleReceiveIDs(IDs);
        });
    }, [])

    
    const handleRemoveMedia = () => {
        console.log('we done here');
        let fileID = queueIDs[0];
        console.log('fileID: ', fileID);
        storageRoomsRef.child(`${roomID}`).child(`${fileID}`).delete();
        roomsRef.child(`${roomID}`).child("queue").child(`${fileID}`).remove()
        .then(() => {
            let changedQueueIds = queueIDs.filter(id => {
                return id !== fileID;
            })
            let changedItemsInQueue = itemsInQueueArray.filter(item => {
                return itemsInQueueArray.indexOf(item) !== queueIDs.indexOf(fileID);
            })
            setItemsInQueueArray(changedItemsInQueue);
            setQueueIDs(changedQueueIds);
        })
    }


    // roomsRef.child(`${roomID}`).child("queue").child(`${fileID}`).child(`${fileType}`).set(`${theurl}`);

    // roomsRef.child(`${roomID}`).child("queue").on('value', handleRenderQueue);

    return (
        <Wrapper>
            {itemsInQueueArray.length > 1 ?
            <XButton onClick={handleRemoveMedia}>❌</XButton> : null
            }

            {itemsInQueueArray.length > 1 && Object.keys(itemsInQueueArray[0])[0] === "game" ?
                <GameRenderer gameTitle={Object.values(itemsInQueueArray[0])[0]}/> : null
            }
            
            {itemsInQueueArray.length > 1 && Object.keys(itemsInQueueArray[0])[0] === "image-file" ?
            <StyledImage src={itemsInQueueArray[0]["image-file"]}/> : null
            }

            {/* <video controls>
                <source src={} type="video"></source>
                Your browser does not support this file
            </video>

            <figure>
                <figcaption>{title}</figcaption>
                <audio
                    controls
                    src={}>
                        Your browser does not support the <code>audio</code> element.
                </audio>
            </figure> */}

            {itemsInQueueArray.length > 1 && Object.keys(itemsInQueueArray[0])[0] === "word-game" ?
            <p>MEDIA</p> : null
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
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const XButton = styled.button`
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    color: #c4b1ab;
    position: absolute;
    top: 2%;
    right: 2%;
    z-index: 1;
`;

export default Media;