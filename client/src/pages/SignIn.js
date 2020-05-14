import React, { useEffect, useContext, useState } from "react";
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import {logIn} from 'react-icons-kit/feather/logIn';
import { useDispatch, useSelector } from 'react-redux';
import { requestUserData, receiveUserData, receiveUserId, receiveUsername, receiveUserDataError, } from '../actions';
import firebase from 'firebase';

const SignIn = () => {
    const [input, setInput] = useState();
    const [redirect, setRedirect] = useState(false)
    const username = useSelector(state => state.userReducer.username)
    const dispatch = useDispatch();
//------------------ STORAGE ------------------
    let avatarInput = document.getElementById('avatarpholder');
    let usernameInput = document.getElementById('userInput');
//----------------- DATA BASE -----------------
    // const userDB = document.getElementById('users');
    // const dbRefObject = firebase.database().ref().child('users');
    
    // dbRefObject.on('value', snap => {
    //     userDB.innerText = JSON.stringify(snap.val(), null, 3);
    // });

    //randomly generated photo
    //perhaps use meme api

    const database = firebase.database();
    const usersRef = database.ref('users');

    let avatarPic = {};

    const maxCharacters = 12
    let characters = 0;

    const handleInput = (event) => {
        event.preventDefault();
        //assign random avatar
        //limit character length
        const userTyped = event.target.value;
        characters = userTyped.length
        if (characters > maxCharacters) {
            return
        } else {
            setInput(userTyped);
        }
        // setEmail(emailTyped);
        // dispatch(requestUserData(username));
    }

    const handleAvatarInput = (event) => {
        avatarPic = event.target.files[0];
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const userID = Date.now();
        //check if user already exists
        //else
        // let avatar = 
        
        dispatch(receiveUserData());
        dispatch(receiveUserId(userID));
        dispatch(receiveUsername(input));
        setRedirect(true);

        // firebase.auth().createUserWithEmailAndPassword(emailInput.value, pwordInput.value).then(auth => {
        //     firebase.storage().ref('users/' + auth.user.uid + '/avatar').put(avatarPic).then(function () {
        //         console.log('success');
        //     })
        // }).catch(error => {
        //     console.log(error.message);
        // })

        usersRef.child(`${userID}`).set({
            username: usernameInput.value,
            userAvatar: 'stringed title of random meme',
            shareScreen: false,
            video: false,
            mic: false,
            onetime: true,
        })

        //redirect to Lobby
    }

    return (
        <Wrapper>
            {redirect?<><Redirect to='/lobby'/></>:<>
            <StyledDiv>
                <Avatar id="avatarpholder" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png" /><br/>
                <StyledForm>
                    <StyledInput id="userInput" type="text" placeholder="One time use username" value={input} onChange={handleInput}></StyledInput><br/>
                    {/* <StyledInput type="file" onChange={handleAvatarInput}></StyledInput> */}
                    <SubmitButton type="submit" onClick={handleSubmit}><Icon icon={logIn} /></SubmitButton>
                </StyledForm>
                <StyledP>Sign-in with Google</StyledP>
            </StyledDiv></>
            }
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
    border: 3px solid #d0ded8;
    border-radius: 8px;
    box-shadow: 0 0 10px 5px #588b76;
    background-color: #588b76;

    width: 400px;
    height: 400px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledForm = styled.form`
    text-align: center;
    background-color: #a1395b;
    width: 60%;
    height: 10%;
    border-radius: 0 8px 0;
    box-shadow: 0 0 10px 5px #588b76;
    
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
    color: #c4b1ab;
    width: 90%;
    height: 100%;
`;

const SubmitButton = styled.button`
    text-decoration: none;
    color: #c4b1ab;
    margin: 10px;
    padding: 2px;
    border: none;
    border-radius: 8px;
    background-color: #a1395b;
    width: 10%;
`

const StyledP = styled.p`
    margin-top: 20px;
`;

export default SignIn;