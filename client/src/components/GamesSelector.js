import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { gamesDivToggle, gameName, addToSharedFiles } from '../actions';
import firebase from 'firebase';

const GamesSelector = () => {
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    const [fileType, setFileType] = useState("game");
    const [gameTitle, setGameTitle] = useState('');
    const roomID = useSelector(state => state.roomReducer.roomID);
    const shareDiv = useSelector(state => state.userReducer.shareDiv)
    const gamesDiv = useSelector(state => state.userReducer.gamesDiv)
    const dispatch = useDispatch();


    const fileID = Date.now();

    const handleTele = (event) => {
        event.preventDefault();
        dispatch(gameName("Telestrations"))
        dispatch(addToSharedFiles(fileID.toString()));
        roomsRef.child(`${roomID}`).child("queue").child(`${fileID}`).child(`${fileType}`).set(`Telestrations`);
        dispatch(gamesDivToggle(!gamesDiv));
    }

    const handleSnake = (event) => {
        event.preventDefault();
        dispatch(gameName("Snake"))
        dispatch(addToSharedFiles(fileID.toString()));
        roomsRef.child(`${roomID}`).child("queue").child(`${fileID}`).child(`${fileType}`).set(`Snake`);
        dispatch(gamesDivToggle(!gamesDiv));
    }

    const handleDrawStory = (event) => {
        event.preventDefault();
        dispatch(gameName("Snake"))
        dispatch(addToSharedFiles(fileID.toString()));
        roomsRef.child(`${roomID}`).child("queue").child(`${fileID}`).child(`${fileType}`).set(`DrawStory`);
        dispatch(gamesDivToggle(!gamesDiv));
    }


    return (
        <Wrapper>
            <StyledButton onClick={handleTele}>
                <StyledImg src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Pencil_vector.svg"/>
            </StyledButton>
            <StyledButton onClick={handleSnake}>
                <StyledImg src="https://www.publicdomainpictures.net/pictures/90000/velka/cobra-snake-poisonous.jpg"/>
            </StyledButton>
            <StyledButton onClick={handleDrawStory}>
                <StyledImg src="https://freesvg.org/img/Feather-Quill-And-Inkwell-Silhouette.png"/>
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
    background-image : linear-gradient(0deg, rgba(63,171,251,1) 0%, rgba(198,70,252,1) 90%);
`;

export default GamesSelector;