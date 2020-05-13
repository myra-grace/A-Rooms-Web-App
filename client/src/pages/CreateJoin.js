import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { createRoom, joinRoom } from '../actions';
import { Icon } from 'react-icons-kit';
import {logIn} from 'react-icons-kit/feather/logIn';

const CreateJoin = () => {
    // const [redirect, setRedirect] = useState(false)
    const roomID = useSelector(state => state.roomReducer.roomID);
    const selection = useSelector(state => state.roomReducer.createJoin);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        let room = event.target.value;
        //check if user already exists
        //redirect to /room
        if (selection === "Create") {
            dispatch(createRoom(room));
            // setRedirect(true);
        }
        dispatch(joinRoom(room));
        // setRedirect(true);
    }

    return (
        <Wrapper>
            <h1>{selection}</h1>
            <StyledForm>
                <StyledInput type="text" name="room" placeholder="Enter room ID"></StyledInput>
                <SubmitButton type="submit" onClick={handleSubmit}><Icon icon={logIn} /></SubmitButton>
            </StyledForm>
        </Wrapper>
    )
};

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    border: 3px solid #d0ded8;
    border-radius: 50%;
    box-shadow: 0 0 10px 10px #588b76;
    background-color: #588b76;

    width: 500px;
    height: 500px;

    display: flex;
    // flex-direction: column;
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

const StyledInput = styled.input`
    text-align: center;
    border: none;
    // border-radius: 4px;
    background-color: transparent;
    // box-shadow: 0 0 10px 5px #a1395b;
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
`;

export default CreateJoin;