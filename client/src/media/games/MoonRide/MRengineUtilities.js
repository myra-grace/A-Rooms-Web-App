import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";


export const GAME_WIDTH = 375; 
export const GAME_HEIGHT = 375;

export const ENEMY_WIDTH = 20;
export const ENEMY_HEIGHT = 42;
export const MAX_ENEMIES = 3;

export const PLAYER_WIDTH = 75;
export const PLAYER_HEIGHT = 54;



export const nextEnemySpot = enemies => {
    const enemySpots = GAME_WIDTH / ENEMY_WIDTH;

    const spotsTaken = [false, false, false, false, false];
    enemies.forEach(enemy => {
        spotsTaken[enemy.spot] = true;
    });

    let candidate = undefined;
    while (candidate === undefined || spotsTaken[candidate]) {
        candidate = Math.floor(Math.random() * enemySpots);
    }
    return candidate;
}

const addBackground = root => {
    const bg = document.createElement("img");
    bg.src = 'images/8cf33581559754a9c3420f990d99a142.gif';
    bg.style.height = `${GAME_HEIGHT}px`;
    bg.style.width = `${GAME_WIDTH}px`;
    bg.style.objectFit = 'cover';
    bg.style.border = '2px solid magenta';
    bg.style.borderRadius = '8px';
    bg.style.boxShadow = '0 0 15px 4px fuchsia';
    root.append(bg);
}

//------------------- PLAYER -------------------

export const Instructions = () => {
    return (
        <Wrapper>
            <MenuDiv>
                <p>Use the arrow keys to dodge the meteors.</p>
                <StyledButton class="start">Start</StyledButton>
            </MenuDiv>
        </Wrapper>
    )
}

export const GameOver = () => {
    return (
        <Wrapper>
            <MenuDiv>
                <StyledH1>Game Over</StyledH1>
                <StyledButton class="reset">Restart</StyledButton>
            </MenuDiv>
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
`;

const MenuDiv = styled.div`
    color: white;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    text-shadow: 0 0 15px fuchsia;

    z-index: 4;
    width: 60%;
    height: 40%;
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