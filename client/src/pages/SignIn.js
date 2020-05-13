import React, { useEffect, useContext, useState } from "react";
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import {logIn} from 'react-icons-kit/feather/logIn';
import { useDispatch, useSelector } from 'react-redux';
import { requestUserData, receiveUserData, receiveUsername, receiveUserDataError, } from '../actions';

const SignIn = () => {
    const [input, setInput] = useState();
    const [redirect, setRedirect] = useState(false)
    const user = useSelector(state => state.userReducer.username)
    const dispatch = useDispatch();

    //randomly generated photo
    //perhaps use meme api

    const handleInput = (event) => {
        event.preventDefault();
        //assign random avatar
        //limit character length
        let username = event.target.value;
        // let avatar = 
        setInput(username);
        dispatch(requestUserData(username));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //check if user already exists
        //else
        // let avatar = 
        dispatch(receiveUserData(input));
        dispatch(receiveUsername(input));
        setRedirect(true);
        //redirect to Lobby
    }

    return (
        <Wrapper>
            {redirect?<><Redirect to='/lobby'/></>:<>
            <StyledDiv>
                <Avatar src="https://i.imgflip.com/hkcl6.jpg?a441288" /><br/>
                <StyledForm>
                    <StyledInput type="text" name="alias" placeholder="Enter one time use username" value={input} onChange={handleInput}></StyledInput><br/>
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

    width: 50vw;
    height: 50vh;

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
    margin: 15px auto;
    border: none;
    background-color: transparent;
    color: #a1395b;
    width: 90%;
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