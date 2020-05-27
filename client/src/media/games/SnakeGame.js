import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import firebase from 'firebase';
//---------------------------------------------------------------------------

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

const CANVAS_SIZE = [450, 450];
const SCALE = 15;
const SPEED = 100;
const SNAKE_START = [
    [8, 7],
    [8, 8]
];
const APPLE_START = [8, 3];
//---------------------------------------------------------------------------

const SnakeGame = () => {
    const database = firebase.database();
    const roomsRef = database.ref('rooms');
    const canvasRef = useRef();
    const [snake, setSnake] = useState(SNAKE_START);
    const [apple, setApple] = useState(APPLE_START);
    const [dir, setDir] = useState([0,-1]);
    const [speedState, setSpeedState] = useState(null);
    const [gameOver, setGameOver] = useState(true);
    const [playing, setPlaying] = useState(false);
    const [score, setScore] = useState(0);

    const username = useSelector(state => state.userReducer.username);
    const roomID = useSelector(state => state.roomReducer.roomID);

    const upHandler = () => {
        setDir([0, -1]);
    }
    useKey("KeyW", upHandler);
    useKey("ArrowUp", upHandler);

    const downHandler = () => {
        setDir([0, 1]);
    }
    useKey("KeyS", downHandler);
    useKey("ArrowDown", downHandler);

    const leftHandler = () => {
        setDir([-1, 0]);
    }
    useKey("KeyA", leftHandler);
    useKey("ArrowLeft", leftHandler);

    const rightHandler = () => {
        setDir([1, 0]);
    }
    useKey("KeyD", rightHandler);
    useKey("ArrowRight", rightHandler);

    const startHandler = () => {
        if (playing === true) {
            return
        } 
        handleStartGame();
    }
    useKey("Space", startHandler);
    useKey("Enter", startHandler);

    const handleStartGame = () => {
        setSnake(SNAKE_START);
        setApple(APPLE_START);
        setDir([0, -1]);
        setSpeedState(SPEED);
        setGameOver(false);
        setPlaying(true);
    }

    const handleEndGame = () => {
        setSpeedState(null);
        setGameOver(true);
        setPlaying(false);
    }

    const handleCreateApple = () => {
        let first = Math.floor(Math.random() * (CANVAS_SIZE[0]) / SCALE)
        let second = Math.floor(Math.random() * (CANVAS_SIZE[1]) / SCALE)
        setApple([first, second]);
        // apple.map((_, i) => Math.floor(Math.random() * (CANVAS_SIZE[i]) / SCALE));
    }

    const handleCollisionSnake = (piece, myex = snake) => {
      if (piece !== undefined) {
          if (
            piece[0] * SCALE >= CANVAS_SIZE[0] ||
            piece[0] < 0 ||
            piece[1] * SCALE >= CANVAS_SIZE[1] ||
            piece[1] < 0
        ) {
            return true;
        }
        
        for (const segment of myex) {
            if (piece[0] === segment[0] && piece[1] === segment[1]) {
                return true;
            }
        }
        return false;
      }
    };

    useEffect(() => {
        if (apple === undefined) {
            handleCreateApple()
        }
    }, [apple])

    useEffect(() => {
        if (score < 3) return
        const currentDate = Date.now();
        if (gameOver === true) {
            roomsRef.child(`${roomID}`).child("chat").child(`${currentDate}`).child(`${username}`).set(`🎉Scored ${score} on Snake!🎉`);
        }
        setScore(0);
    }, [gameOver])

    const handleCollisionApple = (newSnake) => {
        if (apple === undefined) return
          if(newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
            setScore(score +1)
            setApple(undefined);
            return true;
        }
        return false;
    };

    const handleGameLoop = () => {
        const snakeCopy = JSON.parse(JSON.stringify(snake));
        const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
        snakeCopy.unshift(newSnakeHead);
        if (handleCollisionSnake(newSnakeHead)) handleEndGame();
        // snakeCopy.pop();
        if (!handleCollisionApple(snakeCopy)) snakeCopy.pop();
        setSnake(snakeCopy);
    };

    useEffect(() => {
        const context = canvasRef.current.getContext('2d');
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
        
        context.fillStyle = "#c4b1ab";
        snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));

        context.fillStyle = "#a1395b";
        if (apple !== undefined) {
            context.fillRect(apple[0], apple[1], 1, 1);
        }
    }, [snake, apple, gameOver]);

    const useInterval = (callback, delay) => {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            const tick = () => {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    useInterval(() => handleGameLoop(), speedState);

    return (
        <Wrapper>
            <div>
                <canvas
                style={{border: '1px solid #d0ded8', boxShadow: '0 0 10px 10px #588b76'}}
                ref={canvasRef}
                width={`${CANVAS_SIZE[0]}px`}
                height={`${CANVAS_SIZE[1]}px`}
                />
            </div>
            {gameOver ? 
            <StyledButton onClick={handleStartGame}>START GAME</StyledButton>
            : null}
        </Wrapper>
    )
}

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 6;
`;

const StyledButton = styled.button`
    text-decoration: none;
    color: #c4b1ab;
    margin: 0 auto;
    padding: 2px;
    border: none;
    border-radius: 4px;
    box-shadow: 0 0 10px 10px #a1395b;
    background-color: #588b76;
    width: 20%;
    height: 10%;
    position: absolute;
    z-index: 1;
`;

export default SnakeGame;