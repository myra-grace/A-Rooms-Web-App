import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';



const Share = () => {

    let file = {};

    const fileUpload = (event) => {
        console.log('file upload');
        file = event.target.files[0];
    }

    const handleUpload = (event) => {
        console.log('Cliked to upload');
    }

    return (
        <Wrapper>
            <button>Share Screen</button>
            <styledForm>
                <input type='file' style={{border: "2px solid black"}} onChange={fileUpload} /><br/>
                <button onClick={handleUpload}>Submit</button>
            </styledForm>
        </Wrapper>
    )
}

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: red;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const styledButton = styled.button`
    text-decoration: none;
    color: #a1395b;
    font-size: 40px;
    margin: 10px;
    border: none;
    border-radius: 4px;
    background-color: #c4b1ab;
    width: 60%;
`;

const styledForm = styled.form`
    width: 60%;
    height: 60%;
`;

export default Share;