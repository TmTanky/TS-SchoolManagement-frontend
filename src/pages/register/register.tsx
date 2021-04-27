import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

// Interfaces
import { Iregister } from '../../interfaces/register'
import { IuserInfo } from '../../interfaces/userInfo'
import { IloginError } from '../../interfaces/login'

// Material-UI
import { TextField, Button } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// Redux
import { loginSuccess, loginTrue } from '../../redux/actions/actions'

// CSS
import './register.css'

export const RegisterPage: FC = () => {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [registerErrors, setRegisterErrors] = useState<{err: string[]}>({
        err: []
    })
    const [register, setRegister] = useState<Iregister>({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target

        setRegister({
            ...register,
            [name]: value
        })
    }

    const registerSubmit = async () => {
        
        try {

            const {data} = await axios.post<{data: {createUser: IuserInfo}, errors: IloginError[]}>('http://localhost:8000/graphql', {
                query: `mutation createUser($firstName: String!, $middleName: String!, $lastName: String!, $email: String!, $password: String!, $passwordConfirm: String!) {
                    createUser(firstName: $firstName, middleName: $middleName, lastName: $lastName, email: $email, password: $password, passwordConfirm: $passwordConfirm) {
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
                }`,
                variables: {
                    firstName: register.firstName,
                    middleName: register.middleName,
                    lastName: register.lastName,
                    email: register.email,
                    password: register.password,
                    passwordConfirm: register.passwordConfirm
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log(data.data.createUser)

            if (data.data.createUser !== null) {
                dispatch(loginSuccess(data.data.createUser))
                dispatch(loginTrue())
            }

            if (data.errors && data.errors.length >= 1 ) {
                data.errors.map(item => {
                    return setRegisterErrors({
                        err: [item.message]
                    })
                })
                return setOpen(true)
            }
            
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="registerbox">
            <form method="post" className="registerform" >
                <h1 style={{marginBottom: '1rem'}} > Register </h1>

                {registerErrors.err.map(item => {
                        return <Collapse in={open} key={item} >
                                    <Alert
                                    action={
                                        <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpen(false)
                                            setRegisterErrors({
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

                <TextField name="firstName" style={{marginTop: '0.5rem'}} type="text" variant="filled" label="First Name" value={register.firstName} onChange={handleChange} />
                <TextField name="middleName" type="text" variant="filled" label="Middle Name" value={register.middleName} onChange={handleChange} />
                <TextField name="lastName" type="text" variant="filled" label="Last Name" value={register.lastName} onChange={handleChange} />
                <TextField name="email" type="email" variant="filled" label="Email" value={register.email} onChange={handleChange} />
                <div className="passwords">
                    <TextField name="password" type="password" variant="filled" label="Password" style={{width: '50%'}} value={register.password} onChange={handleChange} />
                    <TextField name="passwordConfirm" type="password" variant="filled" label="Password Confirm" style={{width: '50%'}} value={register.passwordConfirm} onChange={handleChange} />
                </div>
                <Button onClick={registerSubmit} variant="contained" color="primary" style={{marginTop: '1rem'}} > Register </Button>
            </form>
        </div>
    )

}