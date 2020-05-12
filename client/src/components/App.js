import React from 'react';
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

//------------------------------------------------------------

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <StyledLink exact to="/"><Icon icon={home} /></StyledLink>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/create-join" component={CreateJoin} />
        <Route exact path="/room" component={Room} />
        <Route exact path="/lobby" component={Lobby} />
      </Switch>
    </Router>
    
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
