import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import {logIn} from 'react-icons-kit/feather/logIn';
import { useDispatch, useSelector } from 'react-redux';
import { requestUserData, receiveUserData, receiveUserId, receiveUsername, receiveUserDataError, } from '../actions';
import firebase from 'firebase';

const useKey = (key, cb) => {
    const callbackRef = useRef(cb);

    useEffect(() => {
        callbackRef.current = cb;
    });

    useEffect(() => {
        const keyHandler = (event) => {
            if (event.code === key) {
                callbackRef.current(event);
            }
        }
        document.addEventListener("keypress", keyHandler);
        return () => document.removeEventListener("keypress", keyHandler);
    }, [key]);
}

const SignIn = () => {
    const database = firebase.database();
    const usersRef = database.ref('users');
    const [input, setInput] = useState(null);
    const username = useSelector(state => state.userReducer.username);
    let avatarInput = document.getElementById('avatarpholder');
    let usernameInput = document.getElementById('userInput');
    const dispatch = useDispatch();
    const history = useHistory();

    //randomly generated photo
    //perhaps use meme api

    let avatarPic = {};

    const maxCharacters = 12;
    let characters = 0;

    const handleInput = (event) => {
        event.preventDefault();
        const userTyped = event.target.value;
        characters = userTyped.length
        if (characters > maxCharacters) {
            return
        } else {
            setInput(userTyped);
        }
        // dispatch(requestUserData(username));
    }

    const handleAvatarInput = (event) => {
        avatarPic = event.target.files[0];
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const userID = Date.now();
        //check if user already exists
        // let avatar = 
        if (input !== null) {
            // dispatch(receiveUserData());
            dispatch(receiveUserId(userID));
            dispatch(receiveUsername(input));

            usersRef.child(`${userID}`).set({
                username: usernameInput.value,
                userAvatar: 'stringed title of random meme',
                shareScreen: false,
                video: false,
                mic: false,
                room: null,
                onetime: true,
            })
            history.push(`/create-join`);
        } else {
            return;
        }
    }

    useKey("Enter", handleSubmit);

    return (
        <Wrapper>
            <StyledDiv>
                <StyledForm>
                    <StyledInput id="userInput" type="text" placeholder="One time use username" tabindex="1" value={input} onChange={handleInput}></StyledInput><br/>
                    {/* <StyledInput type="file" onChange={handleAvatarInput}></StyledInput> */}
                    <SubmitButton type="submit" onClick={handleSubmit}><Icon icon={logIn} /></SubmitButton>
                </StyledForm>
            </StyledDiv>
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

const StyledDiv = styled.div`
    text-align: center;
    border: 3px solid #E0CAFF;
    border-radius: 50%;
    box-shadow: 0 0 10px 10px #588b76;
    background-image : linear-gradient(0deg, rgba(63,171,251,1) 0%, rgba(198,70,252,1) 90%);

    width: 500px;
    height: 500px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledForm = styled.form`
    text-align: center;
    border: none;
    border-radius: 0 8px 0;
    background-color: #c4b1ab;
    box-shadow: 0 0 10px 5px #a1395b;
    color: #a1395b;
    width: 70%;
    height: 10%;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Avatar = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 2px solid #a1395b;
    border-radius: 50%;
`;

const StyledInput = styled.input`
    text-align: center;
    border: none;
    background-color: transparent;
    color: #a1395b;
    width: 100%;
    height: 100%;
`;

const SubmitButton = styled.button`
    text-decoration: none;
    color: #a1395b;
    padding: 2px;
    border: none;
    border-radius: 0 8px 0 0;
    background-color: #588b76;
    width: 10%;
    height: 100%;
`

const StyledP = styled.p`
    margin-top: 20px;
`;

export default SignIn;