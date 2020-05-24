import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import firebase from 'firebase';
import { shareDivToggle, addToSharedFiles } from '../actions';


const Share = () => {
    const database = firebase.database();
    const usersRef = database.ref('users');
    const roomsRef = database.ref('rooms');
    const storage = firebase.storage();
    const [showDiv, setShowDiv] = useState(false);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [fileType, setFileType] = useState('');
    const roomID = useSelector(state => state.roomReducer.roomID);
    const shareDiv = useSelector(state => state.userReducer.shareDiv)
    const dispatch = useDispatch();
    const fileName = useRef;

    const handleImage = (event) => {
        event.preventDefault();
        setFileType('image-file');
        setShowDiv(true);
    }

    const handleAudio = (event) => {
        event.preventDefault();
        setFileType('audio-file');
        setShowDiv(true);
    }

    const handleVideo = (event) => {
        event.preventDefault();
        setFileType('video-file');
        setShowDiv(true);
    }

    const handleWeb = (event) => {
        event.preventDefault();
        setFileType('web');
        setShowDiv(true);
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
        const fileID = Date.now();
        const uploadTask = storage.ref(`rooms/${roomID}/${fileID}`).put(file)
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
                .child(`${fileID}`)
                .getDownloadURL()
                .then(theurl => {
                    roomsRef.child(`${roomID}`).child("queue").child(`${fileID}`).child(`${fileType}`).set(`${theurl}`);
                    dispatch(addToSharedFiles(fileID));
                });
            }
        )
        setFileType('');
        dispatch(shareDivToggle(!shareDiv));
    }

    return (
        <Wrapper>
            <h2>Add To Queue</h2>
            <StyledForm>
                {!showDiv ? null :
                <div style={{display: "block", justifyContent: "center"}}>
                    <Styledprogress id="uploader" value={progress} max="100">{progress}</Styledprogress><br/>
                    <p>{fileName}</p>
                    <input ref={fileName} type='file' onChange={fileUpload} />
                    <SubmitButton onClick={handleUpload}>Submit</SubmitButton>
                </div>
                }
                {showDiv ? null :
                <div style={{display: "flex", flexDirection: "row"}}>
                    <StyledButton onClick={handleImage}>Image</StyledButton>
                    <StyledButton onClick={handleAudio}>Audio</StyledButton>
                </div>
                }
            </StyledForm>
        </Wrapper>
    )
}

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SubmitButton = styled.button`
    text-decoration: none;
    color: white;
    margin: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    background-color: #a1395b;

    :focus {
        background-color: magenta;
    }
`;

const StyledButton = styled.button`
    text-decoration: none;
    color: #a1395b;
    margin: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    background-color: #c4b1ab;

    :focus {
        background-color: magenta;
        color: white;
    }
`;

const StyledForm = styled.form`
    width: 60%;
    height: 60%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Styledprogress = styled.progress`
    width: 60%;
    height: 10%;
    z-index: 1;

    &::-webkit-appearance: meter;
`;

export default Share;