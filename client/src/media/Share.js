import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import firebase from 'firebase';


const Share = () => {
    const storageRef = firebase.storage().ref;
    const [file, setFile] = useState();
    const [progress, setProgress] = useState(0);
    const roomID = useSelector(state => state.roomReducer.roomID);


    // let file = {};
    let uploader = document.getElementById('uploader');

    const fileUpload = (event) => {
        console.log('file upload - ONCHANGE');
        let theFile = event.target.file[0];
        setFile(theFile);

        // let file = event.target.files[0];
        // let storageRef = storage.ref(`${file.name}`);
        // let task = storageRef.put(file);
        // task.on('state_changed',
        //     function progress (snapshot) {
        //         let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         uploader.value = percentage;
        //     },

            // const error = () => {

            // }

            // const complete = () => {

            // }
        // )
    }

    const handleUpload = (event) => {
        console.log('Cliked to upload');
        const makeUpload = storageRef.child('rooms').child(`${roomID}`).child(`${file}`);
        makeUpload.on(
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
                storageRef.child('rooms')
                .child(`${roomID}`)
                .child(`${file}`)
                .getDownloadURL()
                .then(url => {

                })
            }
        )
    }

    return (
        <Wrapper>
            <button>Share Screen</button>
            <styledForm>
                <progress id="uploader" value={progress} max="100">{progress}</progress><br/>
                <input type='file' style={{border: "2px solid black"}} onChange={fileUpload} /><br/>
                <button onClick={handleUpload}>Submit</button>
            </styledForm>
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

const styledButton = styled.button`
    text-decoration: none;
    color: #a1395b;
    font-size: 40px;
    margin: 10px;
    border: none;
    border-radius: 4px;
    background-color: #c4b1ab;
    width: 60%;
`;

const styledForm = styled.form`
    width: 60%;
    height: 60%;
`;

const styledprogress = styled.progress`
    width: 60%;
    height: 10%;

    -webkit-appearance: 'none';
    appearance:"none";
`;

export default Share;