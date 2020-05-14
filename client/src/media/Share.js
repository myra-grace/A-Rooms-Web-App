import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import firebase from 'firebase';


const Share = () => {

    let file = {};
    let uploader = document.getElementById('uploader');

    const fileUpload = (event) => {
        console.log('file upload');
        let file = event.target.files[0];
        let storageRef = firebase.storage().ref('file' + file.name);
        let task = storageRef.put(file);
        task.on('state_changed',
            function progress (snapshot) {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader.value = percentage;
            },

            // const error = () => {

            // }

            // const complete = () => {

            // }
        )
    }

    const handleUpload = (event) => {
        console.log('Cliked to upload');
    }

    return (
        <Wrapper>
            <button>Share Screen</button>
            <styledForm>
                <progress id="uploader" value="0" max="100">0%</progress><br/>
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