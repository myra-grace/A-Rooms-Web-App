import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
//---------------------------------------------------------------------------

const Friends = () => {
    return (
        <ul>
            <li>Test Friends</li>
            <li>Test Friends</li>
            <li>Test Friends</li>
            <li>Test Friends</li>
            <li>Test Friends</li>
        </ul>
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

export default Friends;