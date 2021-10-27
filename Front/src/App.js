import React from 'react';
import Login from './Login';
import Register from './Register';
import LandingPage from './LandingPage';

import {Link, Route, Switch} from 'react-router-dom';

// import LandingPage from './pages/LandingPage/LandingPage'

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <Login/>
      </Route>
      
      <Route path='/register'>
        <Register/>
      </Route>

      <Route path='/main'>
        <LandingPage />
      </Route>
    </div>
  );
}

export default App;
