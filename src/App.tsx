import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux'

// Components
import Header from './components/header/header';

// Pages
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { HomePage } from './pages/home/home';

// Admin Pages
import { ManageUsersPage } from './pages/admin/users/user'
import { AdminOneUser } from './pages/admin/users/oneUser';
import { AllSubjects } from './pages/admin/subjects/subjects'
import { EditSubjectPage } from './pages/admin/subjects/editsubject'
import { AdminHelpDesk } from './pages/admin/helpdesk/helpdesk';
import { AdminOneTicket } from './pages/admin/helpdesk/oneTicket';

// Teachers Pages
import { TeacherSubjectPage } from './pages/teacher/subjects/subjects'
import { TeacherStudentPage } from './pages/teacher/students/students'

// Student Pages
import { StudentManageSubject } from './pages/student/manageSubs/manageSubs';
import { StudentsSubjectPage } from './pages/student/subjects/subject';
import { StudentHelpDesk } from './pages/student/helpdesk/helpdesk';

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
              {/* Admin Routes */}
              <Route exact path="/admin/users" render={() => isLoggedIn && user.role === UserRole.ADMIN ? <ManageUsersPage/> : <Redirect to="/" />  } />
              <Route path="/admin/users/:userID" render={() => isLoggedIn && user.role === UserRole.ADMIN ? <AdminOneUser/> : <Redirect to="/" />  } />
              <Route exact path="/admin/subjects" render={() => isLoggedIn && user.role === UserRole.ADMIN ? <AllSubjects/> : <Redirect to="/" />  } />
              <Route path="/admin/subjects/edit/:subjectID" render={() => isLoggedIn && user.role === UserRole.ADMIN ? <EditSubjectPage/> : <Redirect to="/" />  } />
              <Route exact path="/admin/helpdesk" render={() => isLoggedIn && user.role === UserRole.ADMIN ? <AdminHelpDesk/> : <Redirect to="/" />  } />
              <Route path="/admin/helpdesk/ticket/:ticketID" render={() => isLoggedIn && user.role === UserRole.ADMIN ? <AdminOneTicket/> : <Redirect to="/" />  } />
              {/* Teacher Routes */}
              <Route exact path="/teacher/subjects" render={() => isLoggedIn && user.role === UserRole.TEACHER ? <TeacherSubjectPage/> : <Redirect to="/" />  } />
              <Route exact path="/teacher/students" render={() => isLoggedIn && user.role === UserRole.TEACHER ? <TeacherStudentPage/> : <Redirect to="/" />  } />
              {/* Student Routes */}
              <Route exact path="/student/managesubjects" render={() => isLoggedIn && user.role === UserRole.STUDENT ? <StudentManageSubject/> : <Redirect to="/" />  } />
              <Route exact path="/student/mysubjects" render={() => isLoggedIn && user.role === UserRole.STUDENT ? <StudentsSubjectPage/> : <Redirect to="/" />  } />
              <Route exact path="/student/helpdesk" render={() => isLoggedIn && user.role === UserRole.STUDENT ? <StudentHelpDesk/> : <Redirect to="/" />  } />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
