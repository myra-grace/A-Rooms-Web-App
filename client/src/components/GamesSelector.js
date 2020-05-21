import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { gameName, addToSharedFiles } from '../actions';
import firebase from 'firebase';

const GamesSelector = () => {
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    const [fileType, setFileType] = useState("game");
    const [gameTitle, setGameTitle] = useState('');
    const roomID = useSelector(state => state.roomReducer.roomID);
    const shareDiv = useSelector(state => state.userReducer.shareDiv)
    const dispatch = useDispatch();


    const fileID = Date.now();

    const handleTele = (event) => {
        event.preventDefault();
        dispatch(gameName("Telestrations"))
        dispatch(addToSharedFiles(fileID));
        roomsRef.child(`${roomID}`).child("queue").child(`${fileID}`).child(`${fileType}`).set(`Telestrations`);
    }

    const handleSnake = (event) => {
        event.preventDefault();
        dispatch(gameName("Snake"))
        dispatch(addToSharedFiles(fileID));
        roomsRef.child(`${roomID}`).child("queue").child(`${fileID}`).child(`${fileType}`).set(`Snake`);
    }


    return (
        <Wrapper>
            <StyledButton onClick={handleTele}>
                <StyledImg src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Pencil_vector.svg"/>
            </StyledButton>
            <StyledButton onClick={handleSnake}>
                <StyledImg src="https://www.publicdomainpictures.net/pictures/90000/velka/cobra-snake-poisonous.jpg"/>
            </StyledButton>
        </Wrapper>
    )
};

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //scroll thingy
    //overflow thing
`;

const StyledButton = styled.button`
    background: transparent;
    margin: 10px;
    padding: 10px;
    border: none;
    width: 40px;
    height: 40px;
`;

const StyledImg = styled.img`
    background: dodgerblue;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover;
`;

export default GamesSelector;