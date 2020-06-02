import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import firebase from "firebase";
import { GAME_WIDTH, GAME_HEIGHT, ENEMY_WIDTH, ENEMY_HEIGHT, MAX_ENEMIES, PLAYER_WIDTH, PLAYER_HEIGHT } from "./MRengineUtilities";
import background from "./assets/ab038146527a900b954800b323717649.jpg";
import roadGif from "./assets/8cf33581559754a9c3420f990d99a142.gif";
import carNoise from "./assets/car_noise.mp3"
import { Instructions, GameOver } from "./MRengineUtilities";

const MoonRide = () => {
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    const username = useSelector(state => state.userReducer.username);
    const roomID = useSelector(state => state.roomReducer.roomID);
    const [score, setScore] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    // const player = useContext();



    const gameLoop = () => {
        setGameOver(false);
        setPlaying(true);
        setScore(score +1); //put into interval
        carNoise.play();


    }

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
            {/* <Instructions />
            <GameOver /> */}

            <GameContainer>
                
            </GameContainer>
        </Wrapper>
    )
}

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
  background-image: url(${background}); //NOT WORKING
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const GameContainer = styled.div`
    width: ${GAME_WIDTH}px;
    height: ${GAME_HEIGHT}px;
    background-image: url(${roadGif});
    background-size: cover;
    border: 2px solid magenta;
    border-radius: 8px;
    box-shadow: 0 0 15px 4px fuchsia;
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