import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { createRoom, joinRoom } from '../actions';

const useKey = (key, cb) => {
    const callbackRef = useRef(cb);

    useEffect(() => {
        callbackRef.current = cb;
    });

    useEffect(() => {
        const keyHandler = (event) => {
            if (event.code === key) {
                callbackRef.current(event);
            }
        }
        document.addEventListener("keypress", keyHandler);
        return () => document.removeEventListener("keypress", keyHandler);
    }, [key]);
}

const Home = () => {
    const [login, setLogin] = useState("Sign-in");
    const [homeRedirect, setHomeRedirect] = useState(false)
    const status = useSelector(state => state.userReducer.status)
    const usernameRedux = useSelector(state => state.userReducer.username)
    console.log('usernameRedux: ', usernameRedux);

    // const [redirect, setRedirect] = useState(false)
    const roomID = useSelector(state => state.roomReducer.roomID);
    const selection = useSelector(state => state.roomReducer.createJoin);
    const dispatch = useDispatch();

    //if already signed-in (google) redirect to Lobby
    //if already signed-in div background is avatar
    //if already signed-in "Sign-in" link changes to username

    if (status !== "signed-in") {
        console.log('not signed-in');
        // setHomeRedirect(true); HELP
    } else {
        console.log('signed-in');
        // setLogin(usernameRedux); HELP
    }

    const handleCreate = () => {
        console.log('CREATE');
        dispatch(createRoom());
        //post to fireBase
        // setRedirect(true);
    };

    const handleJoin = () => {
        console.log('JOIN');
        dispatch(joinRoom());
        //pull data from fireBase
        // setRedirect(true); HELP
    };

    return (
        <Wrapper>
            {homeRedirect?<><Redirect to='/sign-in'/></>:<>
            <StyledDiv>
                <MyButton onClick={handleCreate}>Create</MyButton>
                <MyButton onClick={handleJoin}>Join</MyButton>
                <SignInLink to="/sign-in">{login}</SignInLink>
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
    color: #c4b1ab;
    position: fixed;
    bottom: 10px;
    text-shadow: 0 0 10px  #a1395b;
`

export default Home;