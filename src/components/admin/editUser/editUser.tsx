import {ChangeEvent, FC, useState} from 'react'
import axios from 'axios'

// Interfaces
import { Ierror } from '../../../interfaces/error'

// Material-UI
import { TextField, Button } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// CSS
import './editUser.css'

export const EditUserComponent: FC<{ setToggle: Function, fname: string, mname: string, lname: string, userID: string, getUser: Function, usersRole: string, personID: string }> = ({setToggle, fname, mname, lname, userID, getUser, usersRole, personID}) => {

    const [user, setUser] = useState({
        firstName: fname,
        middleName: mname,
        lastName: lname
    })
    const [open, setOpen] = useState(false)
    const [role,setRole] = useState(usersRole as string)
    const [errors, setErrors] = useState<Ierror[]>([])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target

        setUser({
            ...user,
            [name]: value
        })
    }

    const editUser = async () => {
        
        try {

            const {data} = await axios.post<{errors: Ierror[]}>('http://localhost:8000/graphql', {
                query: `mutation editUsersName($userID: ID!, $firstName: String!, $middleName: String!, $lastName: String!) {
                    editUsersName(userID: $userID, firstName: $firstName, middleName: $middleName, lastName: $lastName) {
                        firstName
                    }
                }`,
                variables: {
                    userID,
                    firstName: user.firstName,
                    middleName: user.middleName,
                    lastName: user.lastName
                }
            })

            if (data.errors && data.errors.length > 0) {
                setErrors(data.errors)
                return setOpen(true)
            }
            
            await getUser()
            setToggle(false)
            
        } catch (err) {
            console.log(err)
        }

    }

    const changeRole = async () => {
        
        try {

            await axios.post('http://localhost:8000/graphql', {
                query: `mutation userChangeRole($personID: ID!, $newRole: String!) {
                    userChangeRole(personID: $personID, newRole: $newRole) {
                        firstName
                    }
                }`,
                variables: {
                    personID,
                    newRole: role
                }
            })

            await getUser()
            setToggle(false)
            
        } catch (err) {
            console.log(err)
        }

    }

    const handleSelectInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRole(e.currentTarget.value)
    }

    return (
        <div className="edituserform">
            <form method="post" className="editname" >
                <h1 style={{textAlign: 'center'}} > Edit Name </h1>
                
                {errors.length >= 1 ? errors.map(item => {
                    return <Collapse in={open} style={{margin: '0.5rem 0rem'}} key={item.message} >
                    <Alert
                    severity="error"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false)
                            setErrors([])
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    >
                    
                    {item.message}
                    </Alert>
                </Collapse>
                }) : ""}
                
                <TextField value={user.firstName} name="firstName" onChange={handleChange} type="text" style={{marginBottom: '0.5rem'}} label="First Name" />
                <TextField value={user.middleName} name="middleName" onChange={handleChange} type="text" style={{marginBottom: '0.5rem'}} label="Middle Name" />
                <TextField value={user.lastName} name="lastName" onChange={handleChange} type="text" style={{marginBottom: '0.5rem'}} label="Last Name" />
                <Button onClick={editUser} style={{marginTop: '1rem'}} color="primary" variant="contained" > Confirm </Button>
            </form>

            <hr/>

            <form method="post" className="editroleform">
                <h1 style={{textAlign: 'center'}} > Change Role </h1>
                <select style={{margin: '1rem 0rem', padding: '0.5rem'}} onChange={handleSelectInputChange} >
                    <option value={usersRole}> Default </option>
                    <option value="admin"> Admin </option>
                    <option value="teacher"> Teacher </option>
                    <option value="student"> Student </option>
                </select>

                <Button onClick={changeRole} color="primary" variant="contained" > Change Role </Button>
            </form>

            <div className="canceledituser">
                <Button onClick={() => setToggle(false)} color="secondary" variant="contained" > Cancel </Button>  
            </div>
        </div>
    )

}