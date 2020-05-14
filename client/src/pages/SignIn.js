import React, { useEffect, useContext, useState } from "react";
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import {logIn} from 'react-icons-kit/feather/logIn';
import { useDispatch, useSelector } from 'react-redux';
import { requestUserData, receiveUserData, receiveUsername, receiveUserDataError, } from '../actions';
import firebase from 'firebase';

const SignIn = () => {
    const [input, setInput] = useState();
    const [redirect, setRedirect] = useState(false)
    const user = useSelector(state => state.userReducer.username)
    const dispatch = useDispatch();

    let avatarInput = document.getElementById('avatarpholder');
    let emailInput = document.getElementById('email');
    let pwordInput = document.getElementById('password');

    //randomly generated photo
    //perhaps use meme api

    let avatarPic = {};

    const handleInput = (event) => {
        event.preventDefault();
        //assign random avatar
        //limit character length
        let username = event.target.value;
        // let avatar = 

        // setInput(username);
        // dispatch(requestUserData(username));
    }

    const handleAvatarInput = (event) => {
        avatarPic = event.target.files[0];
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //check if user already exists
        //else
        // let avatar = 
        
        // dispatch(receiveUserData(input));
        // dispatch(receiveUsername(input));
        setRedirect(true);

        // const user = firebase.auth().signInWithCustomToken('username', {
        //     oneTimeUseUsername: `${input}`
        // });

        firebase.auth().createUserWithEmailAndPassword(emailInput.value, pwordInput.value).then(auth => {
            firebase.storage().ref('users/' + auth.user.uid + '/avatar').put(avatarPic).then(function () {
                console.log('success');
            })
        }).catch(error => {
            console.log(error.message);
        })

        //redirect to Lobby
    }

    return (
        <Wrapper>
            {redirect?<><Redirect to='/lobby'/></>:<>
            <StyledDiv>
                <Avatar id="avatarpholder" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png" /><br/>
                <StyledForm>
                    <StyledInput id="email" type="email" placeholder="Email" value={input} onChange={handleInput}></StyledInput><br/>
                    <StyledInput id="password" type="password" placeholder="Password" value={input} onChange={handleInput}></StyledInput><br/>
                    <StyledInput type="file" onChange={handleAvatarInput}></StyledInput>
                    <SubmitButton type="submit" onClick={handleSubmit}>Submit</SubmitButton>
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
    // background-color: red;
    
    display: flex;
    flex-direction: column;
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
    // margin: 15px auto;
    border: none;
    border-radius: 8px;
    // background-color: transparent;
    color: #a1395b;
    // width: 90%;
    // height: 100%;
`;

const SubmitButton = styled.button`
    text-decoration: none;
    color: #588b76;
    margin: 10px;
    padding: 2px;
    border: none;
    border-radius: 8px;
    background-color: #a1395b;
    width: 60%;
`

const StyledP = styled.p`
    // margin-top: 20px;
`;

export default SignIn;