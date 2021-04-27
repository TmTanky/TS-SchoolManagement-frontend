import { FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Interfaces
import { Istate } from '../../interfaces/state'

// Components
import { Sidebar } from '../sidebar/sidebar'

// Redux
import { loginFalse, logoutSuccess } from '../../redux/actions/actions'

// Material-UI
import MenuIcon from '@material-ui/icons/Menu';

// CSS
import './header.css'

const Header: FC = () => {

    const dispatch = useDispatch()
    const [openSidebar, setOpenSidebar] = useState(false)
    const isLoggedIn = useSelector((state: Istate) => state.isLoggedIn)

    const logout = () => {
        dispatch(logoutSuccess())
        dispatch(loginFalse())
    }

    return (
        <nav>
            <div className="navlogo">
                {isLoggedIn ? <MenuIcon style={{marginLeft: '0.5rem', cursor: 'pointer'}} onClick={() => setOpenSidebar(true)} /> : ""}
                <h1> School Management </h1>
            </div>

            <Sidebar toggle={openSidebar} setToggle={setOpenSidebar} />

            {isLoggedIn ? <div className="navlinks">
                <p onClick={() => logout()} > Logout </p>
            </div> : ""}
        </nav>
    )

}

export default Header