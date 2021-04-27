import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux'

// Components
import Header from './components/header/header';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { HomePage } from './pages/home/home';

// Interfaces
import { Istate } from './interfaces/state';

// CSS
import './App.css';

function App() {

  const isLoggedIn = useSelector((state: Istate) => state.isLoggedIn)
  
  return (
    <div className="App">
      <Header/>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => isLoggedIn ? <Redirect to="/home" /> : <LoginPage/> } /> 
            <Route path="/register" render={() => isLoggedIn ? <Redirect to="/home" /> : <RegisterPage/> } /> 
            <Route path="/home" render={() => !isLoggedIn ? <Redirect to="/" /> : <HomePage/> } />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
