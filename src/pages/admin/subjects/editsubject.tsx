import { FC, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// Material-UI
import { CircularProgress, Fade, Button } from '@material-ui/core'

// Interfaces
import { Isubject } from '../../../interfaces/subjects'

// Components
import { EditSubjectComponent } from '../../../components/admin/editSubject/editSubject'

// CSS
import './subjects.css'

export const EditSubjectPage: FC = () => {

    const {subjectID} = useParams<{subjectID: string}>()
    const [checked, setChecked] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [subject, setSubject] = useState<{data: Isubject}>({
        data: {}
    })

    const getOneSubject = useCallback(async () => {
        const {data} = await axios.post<{data: {oneSubject: Isubject}}>('http://localhost:8000/graphql',{
            query: `query oneSubject($subjectID: ID!) {
                oneSubject(subjectID: $subjectID ) {
                    _id
                    name
                    description
                    studentsWhoTake {
                        _id
                        firstName
                        middleName
                        lastName
                    }
                }
            }`,
            variables: {
                subjectID
            }
        })

        if (data.data.oneSubject) {
            setSubject({
                data: data.data.oneSubject
            })
            setChecked(true)
        }

    },[subjectID])

    useEffect(() => {
        getOneSubject()
    },[getOneSubject])

    return (
        <div>
            {Object.keys(subject.data).length === 0 ? <div className="loading">
                <CircularProgress/>
            </div> : openEdit ? <EditSubjectComponent getOneSubject={getOneSubject} subjectID={subjectID} setOpenEdit={setOpenEdit} checked={checked} subject={subject} /> : <Fade in={checked}>
                <div>
                    <div className="onesub" >
                        <h1 style={{marginBottom: '1rem'}} > {subject.data.name} </h1>
                        <p> {subject.data.description} </p>
                        <Button onClick={() => setOpenEdit(true)} style={{marginTop: '1rem'}} color="primary" variant="contained" > Edit Subject </Button>
                    </div>

                    <div className="studentswhotake">
                        <h1 style={{textAlign: 'center', padding: '2rem 0rem'}} > Students who take: </h1>
                        {subject.data.studentsWhoTake?.length === 0 ? <h2 style={{textAlign: 'center'}} > None. </h2> :
                        subject.data.studentsWhoTake?.map(item => {
                            return <div key={item._id} >
                                <li> {item.firstName} {item.middleName} {item.lastName} </li>
                            </div>
                        }) }
                    </div>
                </div>
            </Fade> }  
                      
        </div>
    )

}