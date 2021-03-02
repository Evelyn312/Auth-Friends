import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './App.css';
import LogIn from './components/LogIn';
import FriendsList from './components/FriendsList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/friends" component={FriendsList}/>
        <Route path="/login" component={LogIn}/>
        <Route component={LogIn} />
      </Switch>
    </Router>

  );
}

export default App;
