import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import firebase from "firebase";

const MoonRide = () => {
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);

    const username = useSelector(state => state.userReducer.username);
    const roomID = useSelector(state => state.roomReducer.roomID);


    useEffect(() => {
        if (score < 3) return
        const currentDate = Date.now();
        if (gameOver === true) {
            roomsRef.child(`${roomID}`).child("chat").child(`${currentDate}`).child(`${username}`).set(`🎉Scored ${score} on MoonRide!🎉`);
        }
        setScore(0);
    }, [gameOver])

    return (
        <Wrapper>
            <GameOverContainer>
                <StyledH1>Game Over</StyledH1>
                <StyledButton class="reset">Restart</StyledButton>
            </GameOverContainer>

            <GameContainer>
                <MenuDiv>
                    <p>Use the arrow keys to dodge the meteors.</p>
                    <StyledButton class="start">Start</StyledButton>
                </MenuDiv>
                <LifeBarDiv></LifeBarDiv>
            </GameContainer> 
        </Wrapper>
    )
}

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(/images/ab038146527a900b954800b323717649.jpg);
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const GameOverContainer = styled.div`
    z-index: 4;
    width: 300px;
    height: 100px;
    border: 2px solid cyan;
    border-radius: 8px;
    box-shadow: inset 0 0 15px 4px turquoise;

    display: none;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
`;

const StyledH1 = styled.h1`
    font-family: monospace;
    font-size: 40px;
    color: white;
    text-shadow: 0 0 15px fuchsia;
    text-align: center;
    margin: 10px auto 2px;
    padding: 0;
    display: none;
`;

const StyledButton = styled.button`
    font-family: monospace;
    font-size: 40px;
    color: white;
    text-shadow: 0 0 15px fuchsia;
    text-align: center;
    margin: 10px auto 2px;
    padding: 0;
    display: none;
`;

const GameContainer = styled.div`
    width: min-content;
    height: min-content;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
`;

const MenuDiv = styled.div`
    color: white;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;

    z-index: 4;
    width: 300px;
    height: 100px;
    border: 2px solid cyan;
    border-radius: 8px;
    box-shadow: inset 0 0 15px 4px turquoise;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding: 10px;
    position: absolute;
`;

const LifeBarDiv = styled.p`
    color: red;
    text-shadow: 0 0 15px mediumvioletred;
    font-size: 15px;
    font-family: 'Courier New', Courier, monospace;
    margin: 0 0 20px;
    height: 30px;
    padding: 0;
    text-align: center;
`;

export default MoonRide;