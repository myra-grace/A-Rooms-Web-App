import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';

import Home from "../pages/Home";
import SignIn from '../pages/SignIn';
import CreateJoin from '../pages/CreateJoin';
import Room from '../pages/Room';
import Lobby from '../pages/Lobby';
import { Icon } from 'react-icons-kit';
import {home} from 'react-icons-kit/feather/home'
import firebase from 'firebase';
import {AppContext} from './AppContext';

//------------------------------------------------------------

const App = () => {
  const database = firebase.database();
  const usersRef = database.ref('users');
  const userID = useSelector(state => state.userReducer.id);
  // const { signInWithGoogle } = useContext(AppContext); HELP

  //----------------- DATA BASE -----------------
  // const userDB = document.getElementById('users');
  // console.log('userDB: ', userDB);
  // const dbRefObject = firebase.database().ref().child('users');
  
  // dbRefObject.on('value', snap => {
  //     userDB.innerText = JSON.stringify(snap.val(), null, 3);
  // });

  

  usersRef.child(`${userID}`).onDisconnect().remove();


  return (
    <>
    <Router>
      <GlobalStyles />
      <StyledLink exact to="/lobby"><Icon icon={home} /></StyledLink>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/create-join" component={CreateJoin} />
        <Route exact path="/room/:roomID" component={Room} />
        <Route exact path="/lobby" component={Lobby} />
      </Switch>
    </Router>
    {/* <button onClick={signInWithGoogle}>Sign-In With Google</button> HELP */}
    </>
  )
};

//---------------------------------- STYLES ----------------------------------

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #c4b1ab;
    position: absolute;
    top: 2%;
    left: 2%;
    z-index: 3;
`

export default App;
