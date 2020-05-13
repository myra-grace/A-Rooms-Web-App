import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Queue = () => {
    //render thumbnails in queue box
    return (
        <Wrapper>
            <p>QUEUE COMPONENT</p>
            <p>queue2</p>
        </Wrapper>
        
    )
}

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
background-color: green;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    //scrollability 
    //scroll overflow
`;

export default Queue;