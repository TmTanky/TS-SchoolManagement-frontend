import {ChangeEvent, FC, useState} from 'react'
import axios from 'axios'

// Material-UI
import { Fade, Button, TextField, TextareaAutosize } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// Interfaces
import { Isubject } from '../../../interfaces/subjects'
import { Ierror } from '../../../interfaces/error'

export const EditSubjectComponent: FC<{subject: {data: Isubject}, checked: boolean, setOpenEdit: Function, subjectID: string, getOneSubject: Function}> = ({subject, checked, setOpenEdit, subjectID, getOneSubject}) => {

    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState<Ierror[]>([])
    const [editSub, setEditSub] = useState({
        name: subject.data.name,
        description: subject.data.description   
    })

    const editSubject = async () => {
        
        try {

            const {data} = await axios.post<{errors: Ierror[]}>('https://schoolmanagement-gql.herokuapp.com/graphql', {
                query: `mutation editSubject($subjectID: ID!, $newName: String!, $newDescription: String!) {
                    editSubject(subjectID: $subjectID, newName: $newName, newDescription: $newDescription) {
                        name
                    }
                }`,
                variables: {
                    subjectID,
                    newName: editSub.name,
                    newDescription: editSub.description
                }
            })

            if (data.errors && data.errors.length > 0) {
                setErrors(data.errors)
                return setOpen(true)
            }

            await getOneSubject()
            setOpenEdit(false)
            
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
        const {value, name} = e.target

        setEditSub({
            ...editSub,
            [name]: value
        })
    }

    return (
        <div>
            <Fade in={checked}>
                <form className="editsubform" method="post">
                    <h1 style={{textAlign: 'center', marginBottom: '1rem'}} > Edit Subject </h1>

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

                    <TextField name="name" value={editSub.name} onChange={handleChange} style={{marginBottom: '0.5rem'}} label="Name" />
                    <TextareaAutosize name="description" value={editSub.description} onChange={handleChange} rowsMin={10} className="editsubdesc" /> 
                    <span style={{margin: 'auto', marginTop: '1rem'}} > <Button onClick={ async () => {
                        editSubject()
                    }} color="primary" variant="contained" > Submit </Button> <Button color="secondary" variant="contained" onClick={() => setOpenEdit(false)} > Cancel </Button> </span>
                </form>
            </Fade>
        </div>
    )

}