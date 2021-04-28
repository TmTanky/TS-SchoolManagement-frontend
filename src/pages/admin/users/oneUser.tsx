import {FC, useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

// Interfaces
import { IuserInfo } from '../../../interfaces/userInfo'

// Material-UI
import { CircularProgress, Fade, Button } from '@material-ui/core'

// CSS
import './user.css'

export const AdminOneUser: FC =() => {

    const {userID} = useParams<{userID: string}>()
    const [checked, setChecked] = useState(false)
    const [user, setUser] = useState<{ data: IuserInfo }>({
        data: {}
    })

    const getUser = async () => {
        const {data} = await axios.post<{data: {oneUser: IuserInfo}}>('http://localhost:8000/graphql', {
            query: `query oneUser($userID: ID!) {
                oneUser(userID: $userID) {
                    _id
                    firstName
                    middleName
                    lastName
                    email
                    role
                }
            }`,
            variables: {
                userID
            }
        })

        if (data.data.oneUser) {
            setUser({
                data: data.data.oneUser
            })
            setChecked(true)
        }

    }

    useEffect(() => {
        getUser()
    },[])

    return (
        <div className="useruser">
            {Object.keys(user.data).length === 0 ? <div className="loading">
                <CircularProgress/>
            </div> : <Fade in={checked}>
                <div>
                    <h1 style={{textAlign: 'center', paddingTop: '3rem '}} > User Details </h1>
                    <div className="useronly">
                        <h1 style={{marginBottom: '1rem'}} > {user.data.firstName} {user.data.middleName?.substring(0,1)}. {user.data.lastName} </h1>
                        <p> <strong> First Name: </strong> {user.data.firstName} </p>
                        <p> <strong> Middle Name: </strong> {user.data.middleName} </p>
                        <p> <strong> Last Name: </strong> {user.data.lastName} </p>
                        <p> <strong> Email: </strong> {user.data.email} </p>
                        <p> <strong> Role: </strong> {user.data.role} </p>
                        <span> <Button style={{marginTop: '1rem'}} variant="contained" color="primary" > Edit User </Button> </span>
                    </div>
                </div>
            </Fade> }
        </div>
    )

}