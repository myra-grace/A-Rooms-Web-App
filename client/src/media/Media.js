import React from 'react';
import styled from 'styled-components';
//---------------------------------- GAMES ----------------------------------

import SnakeGame from './games/SnakeGame';
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------

const Media = () => {
    //render queue item at first place in here
    //New component for selecting from queue?
    //object-fit: cover everything? No, fitinto
    return (
        <Wrapper>
            <p>Media</p>
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