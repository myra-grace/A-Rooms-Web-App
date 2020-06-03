import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import carNoise from "./assets/car_noise.mp3"
import carNoiseReset from "./assets/car_noise_RESET.mp3"
import hitNoise from "./assets/hit_noise.mp3"


export const GAME_WIDTH = 375; 
export const GAME_HEIGHT = 375;

export const ENEMY_WIDTH = 20;
export const ENEMY_HEIGHT = 42;
export const MAX_ENEMIES = 3;

export const PLAYER_WIDTH = 75;
export const PLAYER_HEIGHT = 55;


export const gas = new Audio(carNoise);
export const resetCarNoise = new Audio(carNoiseReset);
export const hitSound = new Audio(hitNoise);


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