import {FC, useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

// Material-UI
import { CircularProgress, Fade, Button } from '@material-ui/core'

// Interfaces
import { Iconcern } from '../../../interfaces/concern'

export const AdminOneTicket: FC = () => {

    const [checked, setChecked] = useState(false)
    const [ticket, setTicket] = useState<Iconcern>()
    const {ticketID} = useParams<{ticketID: string}>()

    const getOneTicket = useCallback( async () => {

        try {

            const {data} = await axios.post<{data: {oneTicket: Iconcern}}>('http://localhost:8000/graphql', {
                query: `query oneTicket($ticketID: ID!) {
                    oneTicket(ticketID: $ticketID) {
                        _id
                        title
                        concern
                        isResolved
                        ticketBy {
                            firstName
                            middleName
                            lastName
                        }
                    }
                }`,
                variables: {
                    ticketID
                }
            })
            
            if (data.data.oneTicket) {
                setTicket(data.data.oneTicket)
                setChecked(true)
            }

        } catch (err) {
            console.log(err)
        }

    },[ticketID])

    const markAsResolved = async () => {
        
        try {

            await axios.post('http://localhost:8000/graphql',{
                query: `mutation concernDone($ticketID: ID!) {
                    concernDone(ticketID: $ticketID) {
                        title
                    }
                }`,
                variables: {
                    ticketID
                }
            })

            await getOneTicket()
            
        } catch (err) {
            console.log(err)
        }

    }

    const markAsUndo = async () => {
        
        try {

            await axios.post('http://localhost:8000/graphql',{
                query: `mutation concernUndo($ticketID: ID!) {
                    concernUndo(ticketID: $ticketID) {
                        title
                    }
                }`,
                variables: {
                    ticketID
                }
            })

            await getOneTicket()
            
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getOneTicket()
    },[getOneTicket])

    return (
        <div>
            {checked ? <div>
                <Fade in={checked}>
                    <div className="oneticket" >
                        <h1 style={{marginBottom: '1rem'}} > {ticket?.title} </h1>
                        <p style={{marginBottom: '0.3rem'}} > {ticket?.concern} </p>
                        <p> Ticket By: <strong> {ticket?.ticketBy?.firstName} {ticket?.ticketBy?.lastName} </strong> </p>
                        {ticket?.isResolved ? <Button onClick={markAsUndo} style={{marginTop: '1rem'}} color="secondary" variant="contained" > Undo </Button> : <Button onClick={markAsResolved} style={{marginTop: '1rem'}} color="primary" variant="contained" > Mark as Resolved </Button> }
                    </div>
                </Fade>
            </div> : <div className="loading">
                <CircularProgress/>
            </div> }
        </div>
    )

}