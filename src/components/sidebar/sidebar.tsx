import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

// Material-UI
import MenuIcon from '@material-ui/icons/Menu';
import Slide from '@material-ui/core/Slide';
import { Divider } from '@material-ui/core';

// Interfaces
import { Istate } from '../../interfaces/state'
import { UserRole } from '../../interfaces/userInfo';

// Redux
import { loginFalse, logoutSuccess } from '../../redux/actions/actions';

// CSS
import './sidebar.css'

export const Sidebar: FC<{toggle: boolean, setToggle: Function}> = ({toggle, setToggle}) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state: Istate) => state.user.user)

    const logout = () => {
        setToggle(false)
        dispatch(logoutSuccess())
        dispatch(loginFalse())
    }

    return (toggle ? <Slide direction="right" in={toggle} mountOnEnter unmountOnExit >
        <div className="sidebar">
            <div className="close">
                <MenuIcon fontSize="large" onClick={() => setToggle(false)} />
            </div>

            {user.role === UserRole.ADMIN ? <div className="link">
                <h1> Menu </h1>
                <p onClick={() => {
                    setToggle(false)
                    history.push('/admin/users')
                }} > Manage Users  </p>
                <Divider/>
                <p onClick={() => {
                    setToggle(false)
                    history.push('/admin/subjects')
                }} > Manage Subjects </p>
                <Divider/>
                <p onClick={() => {
                    setToggle(false)
                    history.push('/admin/helpdesk')
                }} > Helpdesk </p>
                <Divider/>
                <p onClick={() => logout()} > Logout </p>
            </div> : ""}

            {user.role === UserRole.TEACHER ? <div className="link">
                <h1> Menu </h1>
                <p onClick={() => {
                    setToggle(false)
                    history.push('/teacher/students')
                }} > My Students  </p>
                <Divider/>
                <p onClick={() => {
                    setToggle(false)
                    history.push('/teacher/subjects')
                }} > My Subjects </p>
                <Divider/>
                <p onClick={() => logout()} > Logout </p>
            </div> : ""}

            {user.role === UserRole.STUDENT ? <div className="link">
                <h1> Menu </h1>
                <p onClick={() => {
                    setToggle(false)
                    history.push('/student/mysubjects')
                }} > My Subjects </p>
                <Divider/>
                <p onClick={() => {
                    setToggle(false)
                    history.push('/student/managesubjects')
                }} > Manage Subjects </p>
                <Divider/>
                <p onClick={() => {
                    setToggle(false)
                    history.push('/student/helpdesk')
                }} > Helpdesk </p>
                <Divider/>
                <p onClick={() => logout()} > Logout </p>
            </div> : ""}

        </div>
    </Slide> : <div> </div> )

}