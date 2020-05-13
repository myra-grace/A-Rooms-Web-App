import React from 'react';
import styled from 'styled-components';
import SnakeGame from '../media/games/SnakeGame'

const GamesSelector = () => {
    return (
        <Wrapper>
            <p>GAME SELECTOR COMPONENT</p>
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

export default GamesSelector;