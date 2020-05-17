import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { createRoom, joinRoom } from '../actions';
import { Icon } from 'react-icons-kit';
import {logIn} from 'react-icons-kit/feather/logIn';
import firebase from 'firebase';
import { receiveRoomId, receiveUserToRoom } from '../actions';
import SignIn from "./SignIn";


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

const CreateJoin = () => {
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    const [room, setRoom] = useState();
    const history = useHistory();
    // const roomID = useSelector(state => state.roomReducer.roomID);
    const selection = useSelector(state => state.roomReducer.createJoin);
    const userID = useSelector(state => state.userReducer.id);
    const username = useSelector(state => state.userReducer.username);
    let roomInput = document.getElementById('room');
    const dispatch = useDispatch();

    if (selection === null) {
        history.push(`/`);
    }

    const handleInput = (event) => {
        event.preventDefault();
        let room = event.target.value;
        setRoom(room);
        //if creating -->
        dispatch(receiveRoomId(room));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(receiveRoomId(room));
        dispatch(receiveUserToRoom(userID));
        dispatch(joinRoom());
        if (selection === "Create") {
            dispatch(receiveRoomId(room));
            dispatch(receiveUserToRoom(userID));
            //check if room already exists
            roomsRef.child(`${room}`).child("userIDs").child(`${userID}`).set(username)
        } else {
            //check if room already exists
            roomsRef.child(`${room}`).child("userIDs").child(`${userID}`).set(username)
        }
        history.push(`/room/${room}`);
    }

    useKey("Enter", handleSubmit);

    const placeholderString = `${selection}: room ID`

    return (
        <Wrapper>
            <StyledForm>
                <StyledInput id="roomInput" type="text" placeholder={placeholderString} tabindex="1" value={room} onChange={handleInput}></StyledInput>
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