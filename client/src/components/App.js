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
import Telestrations from '../media/games/Telestrations';


//------------------------------------------------------------

const App = () => {
  const database = firebase.database();
  const usersRef = database.ref('users');
  const roomsRef = database.ref('rooms');
  const storage = firebase.storage();
  const storageRoomsRef = storage.ref('rooms');
  const userID = useSelector(state => state.userReducer.id);
  const roomID = useSelector(state => state.roomReducer.roomID);
  const myQueuedIDs = useSelector(state => state.roomReducer.sharedFiles);
  // const { signInWithGoogle } = useContext(AppContext); HELP

  //----------------- DATA BASE -----------------
  // const userDB = document.getElementById('users');
  // console.log('userDB: ', userDB);
  // const dbRefObject = firebase.database().ref().child('users');
  
  // dbRefObject.on('value', snap => {
  //     userDB.innerText = JSON.stringify(snap.val(), null, 3);
  // });


  myQueuedIDs.forEach(id => {
    roomsRef.child(`${roomID}`).child("queue").child(`${id}`).onDisconnect().remove().then(() => {
      // storageRoomsRef.child(`${roomID}`).child(`${id}`).delete(); //HELP
    });
  });


  usersRef.child(`${userID}`).onDisconnect().remove();


  return (
    <>
    <Router>
      <GlobalStyles />
      <StyledLink to="/"><Icon icon={home} /></StyledLink>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/create-join" component={CreateJoin} />
        <Route path="/room/:roomID" component={Room} />
        <Route path="/*" render={() => <Wrapper><h1>Nothing here...</h1> <img style={{borderRadius: "20%"}} src="https://i.gifer.com/3lL0.gif" /> </Wrapper>} />

      </Switch>
    </Router>
    {/* <button onClick={signInWithGoogle}>Sign-In With Google</button> */}
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
    z-index: 10;
`
const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    display: block;
    align-items: center;
    justify-content: center;
`;

export default App;
