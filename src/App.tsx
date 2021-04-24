import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Components
import Header from './components/header/header';
import { LoginPage } from './pages/login/login';

function App() {
  return (
    <div className="App">
      <Header/>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginPage} /> 
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
