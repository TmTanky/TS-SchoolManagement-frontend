import {ChangeEvent, FC} from 'react'
import axios from 'axios'

// Material-UI
import { Button, TextField, TextareaAutosize, Fade } from '@material-ui/core'

// Interfaces
import { Iannouncement } from '../../../interfaces/announcements'

// CSS
import './announcement.css'

export const CreateAnnouncement: FC<{setToggle: Function, toggle: boolean, details: Iannouncement, setDetails: Function, getAllAnnouncement: Function}> = ({setToggle, toggle, details, setDetails, getAllAnnouncement}) => {

    const handleChange =(e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {

        const {value, name} = e.target

        setDetails({
            ...details,
            [name]: value
        })

    }

    const createAnnouncement = async () => {

        try {
            const {data} = await axios.post('http://localhost:8000/graphql', {
                query: `mutation createAnnouncement($title: String!, $details: String!) {
                    createAnnouncement(title: $title, details: $details) {
                        _id
                        title
                        details
                    }
                } `,
                variables: {
                    title: details.title,
                    details: details.details
                }
            })

            if (data) {
                getAllAnnouncement()
            }
            
            setDetails({
                title: "",
                details: ""
            })

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Fade in={toggle} >
            <div>
                <form method="post" className="createannform" >
                    <TextField name="title" style={{marginBottom: '0.5rem'}} value={details.title} onChange={handleChange} label="Title" />
                    <TextareaAutosize name="details" placeholder="Details" style={{padding: '0.5rem'}} value={details.details} onChange={handleChange} rowsMin={10} />
                    <span style={{margin: 'auto', marginTop: '1rem'}} > <Button onClick={createAnnouncement} color="primary" variant="contained" > Create </Button> <Button onClick={() => {
                        setToggle(false)
                        setDetails({
                            title: "",
                            details: ""
                        })
                    }} color="secondary" variant="contained" > Cancel </Button> </span>
                </form>
            </div>
        </Fade>
    )

}