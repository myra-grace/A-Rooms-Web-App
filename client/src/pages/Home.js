import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

const Home = () => {
    const [homeRedirect, setHomeRedirect] = useState(false)
    const [footer, setFooter] = useState("Sign-in")
    const status = useSelector(state => state.userReducer.status)
    const username = useSelector(state => state.userReducer.user)

    //if already signed-in (google) redirect to Lobby
    //if already signed-in div background is avatar
    //if already signed-in "Sign-in" link changes to username

    const handleCreate = () => {
        console.log('CREATE');
    };

    const handleJoin = () => {
        console.log('JOIN');
    };

    if (status !== "signed-in") {
        console.log('not signed-in');
        // setHomeRedirect(true);
    } else {
        console.log('signed-in');
        // setFooter(username); messes up redirect to lobby
    }

    return (
        <Wrapper>
            {homeRedirect?<><Redirect to='/sign-in'/></>:<>
            <StyledDiv>
                <MyButton onClick={handleCreate}>Create</MyButton>
                <MyButton onClick={handleJoin}>Join</MyButton>
                <SignInLink to="/sign-in">{footer}</SignInLink>
            </StyledDiv></>
            }
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

const StyledDiv = styled.div`
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

const MyButton = styled.button`
    text-decoration: none;
    color: #a1395b;
    font-size: 40px;
    margin: 10px;
    border: none;
    border-radius: 4px;
    background-color: #c4b1ab;
    width: 60%;
`

const SignInLink = styled(Link)`
    text-decoration: none;
    color: #588b76;
    position: absolute;
    bottom: 40px;
    text-shadow: 0 0 10px  #a1395b;
`

export default Home;