import React from 'react';
import Login from './Login';
import Register from './Register';
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

    </div>
  );
}

export default App;
