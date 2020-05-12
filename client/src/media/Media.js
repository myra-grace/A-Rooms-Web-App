import React from 'react';
import styled from 'styled-components';
//---------------------------------- GAMES ----------------------------------

import SnakeGame from './games/SnakeGame';
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------

const Media = () => {
    return (
        <Wrapper>
            <SnakeGame />
        </Wrapper>
    )
};

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Media;