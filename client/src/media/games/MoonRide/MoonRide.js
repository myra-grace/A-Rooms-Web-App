import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import firebase from "firebase";
import { GAME_WIDTH, GAME_HEIGHT, ENEMY_WIDTH, ENEMY_HEIGHT, MAX_ENEMIES, PLAYER_WIDTH, PLAYER_HEIGHT } from "./MRengineUtilities";
import background from "./assets/ab038146527a900b954800b323717649.jpg";
import roadGif from "./assets/8cf33581559754a9c3420f990d99a142.gif";
import meteor from "./assets/meteor_sprite.gif";
import Enemy from "./Enemy";
import { gas, resetCarNoise, hitSound } from "./MRengineUtilities";



const MoonRide = () => {
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    const username = useSelector(state => state.userReducer.username);
    const roomID = useSelector(state => state.roomReducer.roomID);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [life, setLife] = useState(["❤","❤","❤","❤","❤","❤","❤","❤","❤","❤","❤","❤"]);

    // const player = useContext();
//---------------------------------- ENEMY ----------------------------------
    const [enemies, setEnemies] = useState([]);

    const newEnemy = () => {
        let enemy = [];
        let x = Math.floor(Math.random() * GAME_WIDTH) / ENEMY_WIDTH;
        let y = - ENEMY_HEIGHT;
        enemy = [x, y];
        enemies.push(enemy);

        let destroyed = false;
        let speed = Math.random() / 2 + 0.25;

        // return (
        //     <img src={meteor} style={{
        //         objectFit: 'cover', 
        //         width: `${ENEMY_WIDTH}px`, 
        //         height: `${ENEMY_HEIGHT}px`,
        //         position: 'absolute',
        //         left: `${x}px`,
        //         top: `${y}px`,
        //         zIndex: '2'
        //     }}/>
        // )
    }

    const update = (timeDiff) => {
        this.y = this.y + timeDiff * this.speed;
        this.domElement.style.top = `${this.y}px`;

        if (this.y > GAME_HEIGHT) {
                this.root.removeChild(this.domElement);
                this.destroyed = true;
        }
    }

//---------------------------------- ENGINE ----------------------------------

    useEffect(() => {
        if (gameOver === false) {
        gas.play();
        gas.addEventListener('ended', () => {
            gas.play();
        })
        } else {
            gas.pause();
        }
    }, [gameOver]);

    useEffect(() => {
        if (gameOver === true) return
            const points = setInterval(() => {
            setScore(score + 1);
            clearInterval(points) //FIX?
        }, 100); 
    }, [gameOver, score])

    useEffect(() => {
        while (enemies.length < MAX_ENEMIES) {
            newEnemy();
        }
    }, [enemies])

    const gameLoop = () => {
        setGameOver(false);

        // let lastFrame = ""
        // if (lastFrame === "") lastFrame = (new Date).getTime();
        // let timeDiff = (new Date).getTime() - lastFrame;
        // lastFrame = (new Date).getTime();
        
        // enemies.forEach(enemy => {
        //     enemy.update(timeDiff);
        // });
        // enemies = enemies.filter(enemy => {
        //     return !enemy.destroyed;
        // });
        // while (enemies.length < MAX_ENEMIES) {
        //     newEnemy();
        // }

        console.log('enemies: ', enemies);
    }

    useEffect(() => {
        if (score === 0) return
        const currentDate = Date.now();
        if (gameOver === true) {
            roomsRef.child(`${roomID}`).child("chat").child(`${currentDate}`).child(`${username}`).set(`🎉Scored ${score} on MoonRide!🎉`);
        }
        setScore(0);
    }, [gameOver])

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

                {/* {!playing && !gameOver ? null:
                <CenteringDiv>
                    <MenuDiv>
                        <StyledH1>Game Over</StyledH1>
                        <StyledButton onClick={setPlaying(true), setGameOver(false)}>Restart</StyledButton>
                    </MenuDiv>
                </CenteringDiv>
                } */}

                {enemies.map((enemy, key) => {
                    console.log('enemy: ', enemy);
                    return (
                        <img key={key} src={meteor} style={{
                            objectFit: 'cover', 
                            width: `${ENEMY_WIDTH}px`, 
                            height: `${ENEMY_HEIGHT}px`,
                            position: 'absolute',
                            left: `${enemy[0]}`,
                            top: `${enemy[1]}`,
                            zIndex: '2'
                        }}/>
                    )
                })}
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