import { FC } from 'react'

// Material-UI
import MenuIcon from '@material-ui/icons/Menu';
import Slide from '@material-ui/core/Slide';
import { Divider } from '@material-ui/core';

// CSS
import './sidebar.css'

export const Sidebar: FC<{toggle: boolean, setToggle: Function}> = ({toggle, setToggle}) => {

    return (toggle ? <Slide direction="right" in={toggle} mountOnEnter unmountOnExit >
        <div className="sidebar">
            <div className="close">
                <MenuIcon fontSize="large" onClick={() => setToggle(false)} />
            </div>

            <div className="link">
                <h1> Menu </h1>
                <p> Manage Users </p>
                <Divider/>
                <p> Manage Subjects </p>
                <Divider/>
                <p> Logout </p>
            </div>
        </div>
    </Slide> : <div> </div> )

}