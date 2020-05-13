import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
//---------------------------------------------------------------------------

const Rooms = () => {
    //pull room info from fireBase
    return (
        <ul>
            <li>Test Room</li>
            <li>Test Room</li>
            <li>Test Room</li>
            <li>Test Room</li>
            <li>Test Room</li>
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

export default Rooms;