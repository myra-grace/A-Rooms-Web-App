import React, { useEffect, useContext, useState } from "react";
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { requestUserData, receiveUserData, receiveUserDataError, } from '../actions';

const SignIn = () => {
    const [input, setInput] = useState();
    const [redirect, setRedirect] = useState(false)
    const user = useSelector(state => state.userReducer.user)
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
        setRedirect(true);
        //redirect to Lobby

    }

    return (
        <Wrapper>
            {redirect?<><Redirect to='/lobby'/></>:<>
            <StyledDiv>
                <form>
                    <Avatar src="https://i.imgflip.com/hkcl6.jpg?a441288" /><br/>
                    <StyledInput type="text" name="alias" placeholder="Enter one time use username" value={input} onChange={handleInput}></StyledInput>
                    <SubmitButton type="submit" onClick={handleSubmit}>Submit</SubmitButton>
                    <StyledP>Sign-in with Google</StyledP>
                </form>
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
    border-radius: 4px;
    box-shadow: 0 0 10px 5px #a1395b;
    color: #a1395b;
    width: 300px;
    height: 25px;
`;

const SubmitButton = styled.button`
    text-decoration: none;
    color: #588b76;
    margin: 0 auto;
    padding: 2px;
    border: none;
    border-radius: 4px;
    background-color: #c4b1ab;
    width: 300px;
`

const StyledP = styled.p`
    margin-top: 20px;
`;

export default SignIn;