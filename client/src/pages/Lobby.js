import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Home from './Home';
import Rooms from '../components/Rooms';
import Friends from '../components/Friends';


const Lobby = () => {
    const status = useSelector(state => state.userReducer.status)
    const history = useHistory();
    
    //concider if signed-in with Google
    //else display random active rooms and maybe empty on right
    //IF SIGNED-IN "Sign-in" NOT CLICKABLE

    if (status !== "signed-in") {
        history.push(`/`);
    }
    
    return (
        <Wrapper>
            <LeftDiv>
                <Rooms />
            </LeftDiv>
            <MiddleDiv>
                <Home />
            </MiddleDiv>
            <RightDiv>
                <Friends />
            </RightDiv>
        </Wrapper>
    )
};

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100vw;
    height: 100wh;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
`;

const LeftDiv = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    background-color: #a1395b;
`;
const MiddleDiv = styled.div`
    grid-area: 1 / 2 / 2 / 4;
`;
const RightDiv = styled.div`
    grid-area: 1 / 4 / 2 / 5;
    background-color: #a1395b;
`;



export default Lobby;