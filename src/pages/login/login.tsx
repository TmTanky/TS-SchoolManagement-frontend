import { ChangeEvent, ChangeEventHandler, FC, useState } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux'

// Material-UI
import { TextField, Button } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// Interfaces
import { Ilogin, IloginError } from '../../interfaces/login';

// CSS
import './login.css'
import { IuserInfo } from '../../interfaces/userInfo';
import { loginSuccess } from '../../redux/actions/actions';

export const LoginPage: FC = () => {

    const dispatch = useDispatch()
    const [loginErrors, setLoginErrors] = useState<{err: string[]}>({
        err: []
    })
    const [open, setOpen] = useState(false)
    const [login, setLogin] = useState<Ilogin>({
        email: "",
        password: ""
    })

    const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target

        setLogin({
            ...login,
            [name]: value
        })
    }

    const loginSubmit = async () => {
        try {

            const {data} = await axios.post<{data: {loginUser: IuserInfo}, errors: IloginError[]}>('http://localhost:8000/graphql', {
                query: `query loginUser($email: String!, $password: String!) {
                    loginUser(email: $email, password: $password) {
                        _id
                        firstName
                        middleName
                        lastName
                        age
                        email
                        role
                        subjects {
                        _id
                        name
                        description
                        }
                    }
                } `,
                variables: {
                    email: login.email,
                    password: login.password
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (data.data.loginUser !== null) {
                dispatch(loginSuccess(data.data.loginUser))
                setLoginErrors({
                    err: []
                })
            }
            
            if (data.errors && data.errors.length >= 1 ) {
                data.errors.map(item => {
                    return setLoginErrors({
                        err: [item.message]
                    })
                })
                setOpen(true)
            }
            
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="loginbox" >
            <form method="post" className="loginform" >
                <h1 style={{marginBottom: '1rem'}} > Login </h1>

                    {loginErrors.err.map(item => {
                        return <Collapse in={open} key={item} >
                                    <Alert
                                    action={
                                        <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpen(false)
                                            setLoginErrors({
                                                err: []
                                            })
                                        }}
                                        >
                                        <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    >
                                    
                                    {item}
                                    </Alert>
                                </Collapse>
                    })}

                <TextField label="Email" type="email" variant="filled" style={{marginBottom: '0.3rem', marginTop: '0.5rem'}} name="email" value={login.email} onChange={handleChange} />
                <TextField label="Password" type="password" variant="filled" style={{marginBottom: '0.3rem'}} name="password" value={login.password} onChange={handleChange} />
                <Button variant="contained" onClick={loginSubmit} color="primary" style={{marginTop: '1rem'}} > Login </Button>
            </form>
        </div>
    )

}

