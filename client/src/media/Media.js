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
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------

const Media = () => {
    const database = firebase.database();
    const usersRef = database.ref('users');
    const roomsRef = database.ref('rooms');
    const roomID = useSelector(state => state.roomReducer.roomID);
    const userID = useSelector(state => state.userReducer.id);
    const [fileType, setFileType] = useState('');
    const [fileSrc, setFileSrc] = useState('');
    //render queue item at first place in here
    //New component for selecting from queue?
    //object-fit: cover everything? No, fitinto

    const itemsInQueueArray = [];
    const queueIDs = [];

    const handleFileType = () => {
        if (itemsInQueueArray.length < 1 || itemsInQueueArray[0].length < 1) {
            return
        }
        let file = itemsInQueueArray[0];
        let fileKeys = Object.keys(file);
        let fileValues = Object.values(file);
        if (fileKeys.length !== 1 || fileValues.length < 1) {
            return
        }
        let fileType = fileKeys[0];
        let fileSource = fileValues[0];
        console.log('fileSource: ', fileSource);
        console.log('fileType: ', fileType);
        setFileType(fileType);
        setFileSrc(fileSource);

        // let ID = Object.keys(file);
        // let fileObject = Object.values(file);
        // console.log('fileObject: ', fileObject);
        // switch (key) {
        //     case ('image-file'):
        //         setFileType('image-file');
        //         break;
        
        //     default:
        //         break;
        // }
    }

    useEffect(() => {
        roomsRef.child(`${roomID}`).child("queue").on('child_added', snapshot => {
            let queuedItem = {};
            queuedItem = snapshot.val();
            itemsInQueueArray.push(queuedItem);
            queueIDs.push(snapshot.key);

            console.log('*****QUEUED*****');
            console.log('itemsInQueueArray: ', itemsInQueueArray);
            console.log('queueIDs: ', queueIDs);
            handleFileType();
            });
    }, [])

    const handleRemoveMedia = () => {
        console.log('we done here');
        let fileID = queueIDs[0];
        console.log('fileID: ', fileID);
        roomsRef.child(`${roomID}`).child("queue").child(`${fileID}`).remove();
        //remove from storage
    }

    // roomsRef.child(`${roomID}`).child("queue").child(`${fileID}`).child(`${fileType}`).set(`${theurl}`);

    // roomsRef.child(`${roomID}`).child("queue").on('value', handleRenderQueue);

    return (
        <Wrapper>
            {fileType !== 'image-file' ? null : 
            <StyledImage src={fileSrc}/>
            }

            <MyButton onClick={handleRemoveMedia}>❌</MyButton>
            
            {/* <MyButton>
                <Icon icon={xFeather} />
            </MyButton>

            <MyButton>
                <Icon icon={x} />
            </MyButton>

            <MyButton>
                <Icon icon={androidClose} />
            </MyButton>
            
            <MyButton>
                <Icon icon={ic_close} />
            </MyButton>

            <MyButton>
                <Icon icon={ic_cancel} />
            </MyButton>

            <MyButton>
                <Icon icon={cross} />
            </MyButton> */}

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

const MyButton = styled.button`
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    color: #c4b1ab;
`;

export default Media;