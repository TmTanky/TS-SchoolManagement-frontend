import {ChangeEvent, FC, useState} from 'react'
import axios from 'axios'

// Material-UI
import { TextField, Button, TextareaAutosize, Fade } from '@material-ui/core'
import { Iconcern } from '../../interfaces/concern'

export const CreateTicket: FC<{setToggle: Function, toggle: boolean, userID: string, getUser: Function}> = ({setToggle, toggle, userID, getUser}) => {

    const [ticket, setTicket] = useState({
        title: "",
        concern: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
        const {value, name} = e.target

        setTicket({
            ...ticket,
            [name]: value
        })
    }

    const createTicket = async () => {

        try {

            const {data} = await axios.post<{data: {createConcern: Iconcern}}>('https://schoolmanagement-gql.herokuapp.com/graphql',{
                query: `mutation createConcern($userID: ID!, $title: String!, $concern: String!) {
                    createConcern(userID: $userID, title: $title, concern: $concern) {
                        title
                    }
                }`,
                variables: {
                    userID,
                    title: ticket.title,
                    concern: ticket.concern
                }
            })

            if (data.data.createConcern) {
                await getUser()
                setToggle(false)
            }
            
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Fade in={toggle} >
            <div className="createticketbox">
                <form method="post" className="createticketform" >
                    <TextField style={{marginBottom: '1rem'}} name="title" value={ticket.title} onChange={handleChange} label="Title" focused={true} />
                    <TextareaAutosize style={{padding: '0.5rem'}} name="concern" value={ticket.concern} onChange={handleChange} rowsMin={10} placeholder="Write your concern" />
                    
                    <div className="createticketbtns">
                        <span> <Button disabled={ticket.title === "" || ticket.concern === ""} onClick={createTicket} color="primary" style={{margin: '0rem 0.5rem'}} variant="contained" > Submit Ticket </Button>
                        <Button onClick={() => setToggle(false)} color="secondary" style={{margin: '0rem 0.5rem'}} variant="contained" > Cancel </Button> </span> 
                    </div>
                </form>
            </div>
        </Fade>
    )

}