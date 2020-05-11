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

//------------------------------------------------------------

const App = () => {
  return (
    <Router>
      <GlobalStyles />
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

export default App;
