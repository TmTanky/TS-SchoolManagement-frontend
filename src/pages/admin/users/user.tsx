import {FC, useState, useEffect, MouseEvent} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

// Interfaces
import { IuserInfo } from '../../../interfaces/userInfo'

// Material-UI
import { CircularProgress, Button, Menu, MenuItem } from '@material-ui/core' 
import Fade from '@material-ui/core/Fade';

// CSS
import './user.css'

export const ManageUsersPage: FC = () => {

    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [options, setOptions] = useState("byFirstName")
    const [checked, setChecked] = useState(false)
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const [allUsers, setAllUsers] = useState<{ data: IuserInfo[] }>({
        data: []
    })

    const getAllUsers = async () => {
        const {data} = await axios.post<{data: {allUsers: IuserInfo[]}}>('http://localhost:8000/graphql', {
            query: `query allUsers {
                allUsers {
                    _id
                    firstName
                    middleName
                    lastName
                    email
                    role
                    subjects {
                        _id
                        name
                        description
                    }
                }
            }`
        })

        if (data.data.allUsers) {
            setAllUsers({
                data: data.data.allUsers
            })
            setChecked(true)
        }

    }

    useEffect(() => {
        getAllUsers()
    }, [])
    
    return (
        <div className="manageusers">
            <Button style={{margin: '1rem'}} color="primary" variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Sort By
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* <MenuItem onClick={() => {
                    setOptions('byRole')
                    handleClose()
                }}> By Role </MenuItem> */}
                <MenuItem onClick={() => {
                    setOptions('byFirstName')
                    handleClose()
                }}> By First Name </MenuItem>
                <MenuItem onClick={() => {
                    setOptions('byLastName')
                    handleClose()
                }}> By Last Name </MenuItem>
            </Menu>

            {allUsers.data.length === 0 && options === "byFirstName" ? <div className="loading">
                <CircularProgress/>
            </div> : options === "byLastName" ? <Fade in={checked} >
                <div>
                    {allUsers.data.sort((a, b) => {
                if (a.firstName! < b.firstName!) {
                    return -1
                } else if (a.firstName! > b.firstName!) {
                    return 1
                }
                return 0
            }).map(item => {
                return <div className="oneuser" key={item._id}>
                    <h2> {item.lastName}, {item.firstName} {item.middleName!.substring(0,1)}. </h2>
                    <Button onClick={() => history.push(`/admin/users/${item._id}`)} color="primary" variant="contained" > Details </Button>
                </div>
            })}
                </div>
            </Fade> : <Fade in={checked} >
                <div>
                    {allUsers.data.map(item => {
                        return <div className="oneuser" key={item._id}>
                            <h2> {item.firstName} {item.middleName!.substring(0,1)}. {item.lastName} </h2>
                            <Button onClick={() => history.push(`/admin/users/${item._id}`)} color="primary" variant="contained" > Details </Button>
                        </div>
                    })}
                </div>
            </Fade> }

        </div>
    )

}