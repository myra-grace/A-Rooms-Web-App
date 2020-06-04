import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import firebase from "firebase";
import { GAME_WIDTH, GAME_HEIGHT, ENEMY_WIDTH, ENEMY_HEIGHT, MAX_ENEMIES, PLAYER_WIDTH, PLAYER_HEIGHT } from "./MRengineUtilities";
import background from "./assets/ab038146527a900b954800b323717649.jpg";
import roadGif from "./assets/8cf33581559754a9c3420f990d99a142.gif";
import meteor from "./assets/meteor_sprite.gif";
import car from "./assets/car_STRAIGHT.jpeg"
import carLeft from "./assets/car_LEFT.jpeg"
import carRight from "./assets/car_RIGHT.jpeg"
import carReset from "./assets/car_RESET.gif"
import carCrash from "./assets/car_crashed.gif"

import Enemy from "./Enemy";
import { gas, resetCarNoise, hitSound } from "./MRengineUtilities";

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
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    }, [key]);
}

const MoonRide = () => {
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    const username = useSelector(state => state.userReducer.username);
    const roomID = useSelector(state => state.roomReducer.roomID);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [life, setLife] = useState(["❤","❤","❤","❤","❤","❤","❤","❤","❤","❤","❤","❤"]);
    const [speedBoost, setSpeedBoost] = useState(0.25);
    const [enemyBoost, setEnemyBoost] = useState(MAX_ENEMIES);
    

    // const player = useContext();
//---------------------------------- ENEMY ----------------------------------
    const [enemies, setEnemies] = useState([]);
    const enemyRef = useRef();

    const newEnemy = () => {
        let enemy = [];
        let destroyed = false;
        // let speed = Math.random() / 2 + 0.25 + speedBoost;
        let speed = Math.random() * (1 + speedBoost);
        console.log('speedBoost: ', speedBoost);
        console.log('enemyBoost: ', enemyBoost);
        let x = Math.floor(Math.random() * GAME_WIDTH + 1 - ENEMY_WIDTH / ENEMY_WIDTH - 1);
        let y = - ENEMY_HEIGHT;
        enemy = [x, y, speed];
        enemies.push(enemy);
    }

    useEffect(() => { //FIX HOW THEY STAY ON LEFT
        if (gameOver === true) return;
        if (enemies.length < enemyBoost) {
            newEnemy();
        }
        let movement = [];
        enemies.map((enemy) => {
            if (playerRef.current === undefined || playerRef.current === null) return
            let playerSpace = playerRef.current.getBoundingClientRect();

            let enemyY = enemy[1];
            let enemyX = enemy[0];

            if ((enemyY > playerSpace.top &&
                enemyY < playerSpace.bottom &&
                enemyX > playerSpace.left &&
                enemyX < playerSpace.right) 
            ) {
                hitSound.play();
                setScore(score - 5);
                life.pop();
            }

            if (enemy[1] >= (GAME_HEIGHT - (ENEMY_HEIGHT/2))) { //AND IF HIT PLAYER
                setScore(score + 1);
            } else {
                let speed = enemy[2];
                let x = enemy[0];
                let y = Number(enemy[1]) + speed;
                movement.push([x, y, speed]);
            }
        })
        setEnemies(movement);
    }, [gameOver, enemies])
//---------------------------------- PLAYER ----------------------------------
    const [player, setPlayer] = useState((GAME_WIDTH - PLAYER_WIDTH) / 2);
    const [playerWidth, setPlayerWidth] = useState(PLAYER_WIDTH);
    const [playerHeight, setPlayerHeight] = useState(PLAYER_HEIGHT);
    const [playerImg, setPlayerImg] = useState(car);
    const playerRef = useRef();

    const playerLeft = () => {
        if (player === 0) return
        // setPlayerImg(carLeft);
        setPlayer(player - PLAYER_WIDTH);
    }
    useKey("KeyA", playerLeft);
    useKey("ArrowLeft", playerLeft);

    const playerRight = () => {
        if (player === GAME_WIDTH - PLAYER_WIDTH) return
        // setPlayerImg(carRight);
        setPlayer(player + PLAYER_WIDTH);
    }
    useKey("KeyD", playerRight);
    useKey("ArrowRight", playerRight);

    // const handleStraightenCar = () => {
    //     setPlayerImg(car);
    // }

    // document.addEventListener("keyup", handleStraightenCar);
//---------------------------------- ENGINE ----------------------------------

    useEffect(() => {
        if (gameOver === false) {
        gas.play();
        gas.addEventListener('ended', () => {
            gas.play();
            setSpeedBoost(speedBoost + 0.25);
            setEnemyBoost(enemyBoost + 1);
        })
        } else {
            gas.pause();
        }
    }, [gameOver, speedBoost, enemyBoost]);
    

    const gameLoop = () => {
        setGameOver(false);
    }

    useEffect(() => {
        if (score === 0) return
        const currentDate = Date.now();
        if (life === []) {
            roomsRef.child(`${roomID}`).child("chat").child(`${currentDate}`).child(`${username}`).set(`🎉Scored ${score} on MoonRide!🎉`);
        }
        setScore(0);
        setLife(["❤","❤","❤","❤","❤","❤","❤","❤","❤","❤","❤","❤"]);
    }, [gameOver, life])


//---------------------------------- HTML ----------------------------------
    return (
        <Wrapper>
            <LifeHearts>{life}</LifeHearts>
            <GameContainer>
                {!gameOver ? null: 
                <CenteringDiv>
                    <MenuDiv>
                        <p>Use the arrow keys to dodge the meteors.</p>
                        <StyledButton onClick={gameLoop}>Start</StyledButton>
                    </MenuDiv>
                </CenteringDiv>
                }

                {enemies.map((enemy, key) => {
                    return (
                        <img ref={enemyRef} key={key} src={meteor} style={{
                            objectFit: 'cover', 
                            width: `${ENEMY_WIDTH}px`, 
                            height: `${ENEMY_HEIGHT}px`,
                            position: 'absolute',
                            left: `${enemy[0]}px`,
                            top: `${enemy[1]}px`,
                            zIndex: '2'
                        }}/>
                    )
                })}

                <img ref={playerRef} src={playerImg} style={{
                    objectFit: 'cover', 
                    width: `${playerWidth}px`, 
                    height: `${playerHeight}px`,
                    position: 'absolute',
                    left: `${player}px`,
                    top: `${GAME_HEIGHT - PLAYER_HEIGHT}px`,
                    zIndex: '1'
                }}/>
            </GameContainer>
            <StyledH1>{score} Points</StyledH1>
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
  flex-direction: column;
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
    position: relative;
`;

const LifeHearts = styled.h2`
    color: fuchsia;
    text-shadow: 0 0 15px mediumvioletred;
    margin: 0 0 10px;
`;

const CenteringDiv = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const MenuDiv = styled.div`
    color: white;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    text-shadow: 0 0 15px fuchsia;

    z-index: 4;
    width: 60%;
    height: 20%;
    border: 2px solid cyan;
    border-radius: 8px;
    box-shadow: inset 0 0 15px 4px turquoise;
    padding: 20px 40px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledH1 = styled.h1`
    font-family: 'Courier New', Courier, monospace;
    font-size: 40px;
    color: white;
    text-shadow: 0 0 15px fuchsia;
    text-align: center;
    margin: 5px auto;
    padding: 0;
`;

const StyledButton = styled.button`
    font-family: monospace;
    font-size: 15px;
    color: white;
    border: none;
    border-radius: 4px;
    background-color: #383AEA;
    box-shadow: inset 0 0 8px 4px fuchsia;
    text-align: center;
    margin: 5px auto;
    padding: 5px 10px;
`;

export default MoonRide;