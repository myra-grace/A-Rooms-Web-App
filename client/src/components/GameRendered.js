import React from 'react';
import styled from 'styled-components';
import SnakeGame from '../media/games/SnakeGame';
import Telestrations from '../media/games/Telestrations';

const GameRenderer = () => {
    // retrieve game name from db rooms/roomID/queue[0]
    //in render, if this game, show it's component : null
    return (
        <Wrapper>
            <p>GAME RENDERER COMPONENT</p>
        </Wrapper>
    )
};

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: orange;

    display: flex;
    align-items: center;
    justify-content: center;
    //scroll thingy
    //overflow thing
`;

export default GameRenderer;