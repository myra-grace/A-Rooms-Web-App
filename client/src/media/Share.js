import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import firebase from 'firebase';
import { shareDivToggle, addToSharedFiles } from '../actions';


const Share = () => {
    const database = firebase.database();
    const usersRef = database.ref('users');
    const roomsRef = database.ref('rooms');
    const storage = firebase.storage();
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [fileType, setFileType] = useState('');
    const roomID = useSelector(state => state.roomReducer.roomID);
    const dispatch = useDispatch();

    const handleImage = (event) => {
        event.preventDefault();
        setFileType('image-file');
    }

    const handleAudio = (event) => {
        event.preventDefault();
        setFileType('audio-file');
    }

    const handleVideo = (event) => {
        event.preventDefault();
        setFileType('video-file');
    }

    const handleWeb = (event) => {
        event.preventDefault();
        setFileType('web');
    }

    const fileUpload = (event) => {
        if (event.target.files[0]) {
            setFile(event.target.files[0]);
        }        
    }

    const handleUpload = (event) => {
        event.preventDefault();
        if (fileType === '') {
            return
        }
        const uploadTask = storage.ref(`rooms/${roomID}/${file.name}`).put(file)
        uploadTask.on(
            "state_changed",
            snapshot => {
                const fileProgress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(fileProgress);
            },
            error => {
                console.log(error);
            },
            () => {
                storage.ref('rooms')
                .child(`${roomID}`)
                .child(`${file.name}`)
                .getDownloadURL()
                .then(theurl => {
                    const fileID = Date.now();
                    roomsRef.child(`${roomID}`).child("queue").child(`${fileID}`).child(`${fileType}`).set(`${theurl}`);
                    dispatch(addToSharedFiles(fileID));
                });
            }
        )
        setFileType('');
        dispatch(shareDivToggle());
    }

    return (
        <Wrapper>
            <button>Share Screen</button>
            <button onClick={handleWeb}>Browse the web</button>
            <StyledForm>
                <Styledprogress id="uploader" value={progress} max="100">{progress}</Styledprogress><br/>
                <input type='file' style={{border: "2px solid black"}} onChange={fileUpload} /><br/>
                <button onClick={handleImage}>Image</button>
                <button onClick={handleVideo}>Video</button>
                <button onClick={handleAudio}>Audio</button><br/>
                <button onClick={handleUpload}>Submit</button>
            </StyledForm>
        </Wrapper>
    )
}

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: red;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledButton = styled.button`
    text-decoration: none;
    color: #a1395b;
    font-size: 40px;
    margin: 10px;
    border: none;
    border-radius: 4px;
    background-color: #c4b1ab;
    width: 60%;
`;

const StyledForm = styled.form`
    width: 60%;
    height: 60%;
    background-color: blue;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Styledprogress = styled.progress`
    width: 60%;
    height: 10%;

    &::-webkit-appearance: meter;
`;

export default Share;