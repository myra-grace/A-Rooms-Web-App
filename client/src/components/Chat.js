import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import firebase from 'firebase';
import { Icon } from 'react-icons-kit';
import {ic_send} from 'react-icons-kit/md/ic_send'


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

const Chat = () => {
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    const [message, setMessage] = useState(null);
    const username = useSelector(state => state.userReducer.username);
    let userInput = document.getElementById('userInput');
    

    const dispatch = useDispatch();

    const maxCharacters = 20;
    let characters = 0;
    let count = 1;
    console.log('count: ', count);

    const counter = () => {
        count += 1;
    }

    const handleInput = (event) => {
        event.preventDefault();
        const userTyped = event.target.value;
        if (characters > maxCharacters) {
            return
        } else {
            setMessage(userTyped);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (message !== null) {
            //fix room `${room}`
            roomsRef.child("wow").child("chat").child(`${username}`).push(userInput.value); //HELP
            roomsRef.child("wow").on("child_added", snapshot => {
            //show message in chat
            console.log('MESSAGE ADDED');
        })
        setMessage(null); //NOT WORKING?
        counter();
        } else {
            return;
        }
    }

    const handleRecieveMessages = () => {
        //get from db
        //fix room `${room}`
        // roomsRef.child("Diamond is unbreakable").child("chat").on({
        //     username: userInput.value,
        // })
        //put into test div
    }

    const chatLimiter = () => {
        console.log('chatLimiter');
        //fix room `${room}`
        // roomsRef.child("test").child("chat").child("0").remove(); WORKED FIX TO REMOVE THE 1ST OF 20
    }

    useKey("Enter", handleSubmit);
    chatLimiter();

    return (
        <Wrapper>
            <StyledForm>
                <StyledInput id="userInput" type="text" placeholder="Message" value={message} onChange={handleInput}></StyledInput>
                <StyledButton onClick={handleSubmit}><Icon style={{color: '#c4b1ab'}} size="20" icon={ic_send} /></StyledButton>
            </StyledForm>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div>
                    <h1>TEST</h1>
                    <p style={{color: "magenta", fontWeight: "bold"}}>{username}</p>
                    <p>{message}</p>
                </div>
            </div>
        </Wrapper>
    )
};

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    height: 95%;
    padding: 10px;
    display: flex;
    flex-direction: column-reverse;
    // background-color: pink;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const StyledInput = styled.input`
    width: 85%;
    border-radius: 4px 0 0 4px;
    border: 1px solid magenta;
    padding: 10px;
    color: #c4b1ab;
    background-color: transparent;
`;

const StyledButton = styled.button`
    width: 15%;
    border: none;
    border-radius: 0 4px 4px 0;
    background-color: magenta;
`;

export default Chat;