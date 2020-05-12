import React from 'react';
import styled from 'styled-components';

const Chat = () => {
    return (
        <Wrapper>
            <p>CHAT COMPONENT</p>
        </Wrapper>
    )
};

//---------------------------------- STYLES ----------------------------------

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    background-color: pink;
`;

export default Chat;