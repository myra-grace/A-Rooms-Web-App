import React from 'react';
import styled from 'styled-components';

const CreateJoin = () => {
    return (
        <Wrapper>
            <StyledForm>
                <StyledInput type="text" name="room" placeholder="Enter room ID"></StyledInput>
            </StyledForm>
        </Wrapper>
    )
};

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    width: 100vw;
    height: 100wh;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledForm = styled.form`
    border: 3px solid #d0ded8;
    border-radius: 50%;
    box-shadow: 0 0 10px 10px #588b76;
    background-color: #588b76;

    width: 500px;
    height: 500px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledInput = styled.input`
    text-align: center;
    border: none;
    border-radius: 4px;
    background-color: #c4b1ab;
    box-shadow: 0 0 10px 5px #a1395b;
    color: #a1395b;
    width: 70%;
    height: 10%;
`;

export default CreateJoin;