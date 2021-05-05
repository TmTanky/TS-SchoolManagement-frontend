import {FC, useEffect, useState, useCallback} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

// Interfaces
import { Istate } from '../../../interfaces/state'
import { IuserInfo } from '../../../interfaces/userInfo'

// Material-UI
import { Button, CircularProgress, Fade } from '@material-ui/core'

// Components
import { CreateTicket } from '../../../components/student/createTicket'

// CSS
import './helpdesk.css'

export const StudentHelpDesk: FC = () => {

    const userID = useSelector((state: Istate) => state.user.user._id)
    
    const [create, setCreate] = useState(false)
    const [checked, setChecked] = useState(false)
    const [user, setUser] = useState<IuserInfo>()

    const getUser = useCallback(async() => {

        try {

            const {data} = await axios.post<{data: {oneUser: IuserInfo}}>('https://schoolmanagement-gql.herokuapp.com/graphql', {
                query: `query oneUser($userID: ID!) {
                    oneUser(userID: $userID) {
                        firstName
                        middleName
                        lastName
                        myTickets {
                            _id
                            title
                            concern
                            isResolved
                        }
                    }
                }`,
                variables: {
                    userID
                } 
            })

            if (data.data.oneUser) {
                setUser(data.data.oneUser)
                setChecked(true)
            }
            
        } catch (err) {
            console.log(err)
        }

    },[userID])

    useEffect(() => {
       getUser() 
    },[getUser])

    return (
        <div>
            <div className="createticket">
                <Button onClick={() => setCreate(true)} color="primary" variant="contained" > Create Ticket </Button>
            </div>

            {create ? <CreateTicket getUser={getUser} userID={userID!} toggle={create} setToggle={setCreate} /> : ""}

            {checked ? <Fade in={checked} >
                <div className="mytickets">
                    <h1 style={{padding: '4rem 0rem', textAlign: 'center'}} > My Tickets </h1>
                    {user?.myTickets?.length === 0 ? <h3 style={{padding: '2rem 0rem', textAlign: 'center'}} > No Tickets </h3> :
                    user?.myTickets?.map(item => {
                        return <div key={item._id} className="singleticket">
                            <h2 style={{marginBottom: '1rem'}} > {item.title} </h2>
                            <p style={{marginBottom: '0.5rem'}} > {item.concern} </p>
                            <p> <strong> Status: </strong> {item.isResolved ? 'Done' : 'Pending'} </p>
                        </div>
                    }) }
                </div>
            </Fade> : <div className="loading">
                <CircularProgress/>
            </div> }
        </div>
    )

}