import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';



const Share = () => {
    const fileUpload = () => {
        console.log('file upload');
    }

    const handleUpload = () => {
        console.log('Cliked to upload');
    }

    return (
        <Wrapper>
            <form>
                <input type='file' onChange={fileUpload} />
                <button onClick={handleUpload}>Submit</button>
            </form>
        </Wrapper>
    )
}

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100vw;
    height: 100wh;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Share;