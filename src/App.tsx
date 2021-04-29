import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux'

// Components
import Header from './components/header/header';

// Pages
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { HomePage } from './pages/home/home';
import { ManageUsersPage } from './pages/admin/users/user'
import { AdminOneUser } from './pages/admin/users/oneUser';
import { AllSubjects } from './pages/admin/subjects/subjects'
import { EditSubjectPage } from './pages/admin/subjects/editsubject'

// Interfaces
import { Istate } from './interfaces/state';
import { UserRole } from './interfaces/userInfo';

// CSS
import './App.css';

function App() {

  const user = useSelector((state: Istate) => state.user.user)
  const isLoggedIn = useSelector((state: Istate) => state.isLoggedIn)
  
  return (
    <div className="App">
        <BrowserRouter>
          <Header/>
            <Switch>
              <Route exact path="/" render={() => isLoggedIn ? <Redirect to="/home" /> : <LoginPage/> } /> 
              <Route path="/register" render={() => isLoggedIn ? <Redirect to="/home" /> : <RegisterPage/> } /> 
              <Route path="/home" render={() => isLoggedIn ? <HomePage/> : <Redirect to="/" /> } />
              <Route exact path="/admin/users" render={() => isLoggedIn && user.role === UserRole.ADMIN ? <ManageUsersPage/> : <Redirect to="/" />  } />
              <Route path="/admin/users/:userID" render={() => isLoggedIn && user.role === UserRole.ADMIN ? <AdminOneUser/> : <Redirect to="/" />  } />
              <Route exact path="/admin/subjects" render={() => isLoggedIn && user.role === UserRole.ADMIN ? <AllSubjects/> : <Redirect to="/" />  } />
              <Route path="/admin/subjects/edit/:subjectID" render={() => isLoggedIn && user.role === UserRole.ADMIN ? <EditSubjectPage/> : <Redirect to="/" />  } />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
