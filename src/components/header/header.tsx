import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// Interfaces
import { Istate } from '../../interfaces/state'

// Components
import { Sidebar } from '../sidebar/sidebar'

// Material-UI
import MenuIcon from '@material-ui/icons/Menu';

// CSS
import './header.css'

const Header: FC = () => {

    const history = useHistory()
    const [openSidebar, setOpenSidebar] = useState(false)
    const isLoggedIn = useSelector((state: Istate) => state.isLoggedIn)

    return (
        <nav>
            <div className="navlogo">
                {isLoggedIn ? <MenuIcon style={{marginLeft: '0.5rem', cursor: 'pointer'}} onClick={() => setOpenSidebar(true)} /> : ""}
                <h3 style={{cursor: 'pointer'}} onClick={() => history.push('/home')} > School Management </h3>
            </div>

            <Sidebar toggle={openSidebar} setToggle={setOpenSidebar} />

        </nav>
    )

}

export default Header