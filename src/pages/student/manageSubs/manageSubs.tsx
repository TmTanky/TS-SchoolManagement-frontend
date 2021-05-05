import {FC, useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

// Interfaces
import { Isubject } from '../../../interfaces/subjects'
import { Istate } from '../../../interfaces/state'

// Material-UI
import { Button, Fade, CircularProgress } from '@material-ui/core'

// CSS
import './manageSubs.css'

export const StudentManageSubject: FC = () => {

    const userID = useSelector((state: Istate) => state.user.user._id)
    const [checked, setChecked] = useState(false)
    const [subs, setSubs] = useState<Isubject[]>([])
    const [mySubs, setMySubs] = useState<Isubject[]>([])

    const getUser = useCallback(async() => {

        try {
            
            const {data} = await axios.post<{data: {oneUser: {subjects: Isubject[]}}}>('https://schoolmanagement-gql.herokuapp.com/graphql',{
                query: `query oneUser($userID: ID!) {
                    oneUser(userID: $userID) {
                        subjects {
                            _id
                            name
                        }
                    }
                }`,
                variables: {
                    userID
                }
            })

            if (data.data.oneUser) {
                setMySubs(data.data.oneUser.subjects)
            }
            
        } catch (err) {
            console.log(err)
        }

    },[userID])

    const getAllSubs = async () => {
        
        try {

            const {data} = await axios.post<{data: {allSubjects: Isubject[]}}>('https://schoolmanagement-gql.herokuapp.com/graphql', {
                query: `query allSubjects {
                    allSubjects {
                        _id
                        name
                        description
                        instructor {
                          firstName
                          middleName
                          lastName
                        }
                        studentsWhoTake {
                          firstName
                        }
                    }
                }`
            })

            if (data.data.allSubjects) {
                setSubs(data.data.allSubjects)
                setChecked(true)
            }
            
        } catch (err) {
            console.log(err)
        }

    }

    const addSubject = async (subjectID: string) => {

        try {

            await axios.post('https://schoolmanagement-gql.herokuapp.com/graphql',{
                query: `mutation studentTakeSubject($toTakeSubjects: [String!], $student: ID!) {
                    studentTakeSubject(toTakeSubjects: $toTakeSubjects, student: $student) {
                        firstName
                    }
                }`,
                variables: {
                    toTakeSubjects: [subjectID],
                    student: userID
                }
            })

            await getAllSubs()
            await getUser()
            
        } catch (err) {
            console.log(err)
        }

    }
    
    const removeSubject = async (subjectID: string) => {
        
        try {

            await axios.post('https://schoolmanagement-gql.herokuapp.com/graphql', {
                query: `mutation studentRemoveSubject($toRemoveSubjects: [String!], $student: ID!) {
                    studentRemoveSubject(toRemoveSubjects: $toRemoveSubjects, student: $student) {
                        firstName
                    }
                }`,
                variables: {
                    toRemoveSubjects: [subjectID],
                    student: userID
                }
            })

            await getAllSubs()
            await getUser()
            
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getUser()
        getAllSubs()
    },[getUser])
    
    return (
        <div>
            {!checked ? <div className="loading">
                <CircularProgress/>
            </div> :
            <Fade in={checked} >
                <div>
                    <h1 style={{textAlign: 'center', padding: '4rem 0rem'}} > All Subjects </h1>
                    {subs.map(sub => {
                        return <div key={sub._id} className="manageallsubs" >
                            <h1 style={{marginBottom: '1rem'}} > {sub.name} </h1>
                            <p> {sub.description} </p>
                            <h3 style={{marginTop: '0.5rem'}} > Instructor: {sub.instructor?.firstName === undefined || null ? 'None' : `${sub.instructor?.firstName} ${sub.instructor?.lastName}` } </h3>
                            <p style={{marginTop: '0.5rem'}} > <strong> Students who take: </strong> {sub.studentsWhoTake?.length} </p>
                            {mySubs.filter(item => item._id === sub._id).length === 1 ?
                            <Button onClick={() => removeSubject(sub._id!)} style={{marginTop: '0.5rem'}} color='secondary' variant="contained" > Remove </Button> :
                            <Button onClick={() => addSubject(sub._id!)} style={{marginTop: '0.5rem'}} color='primary' variant="contained" > Add </Button>}
                        </div>
                    })}
                </div>
            </Fade> }
        </div>
    )

}