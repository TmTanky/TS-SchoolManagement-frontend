import {FC, useState, useEffect, ChangeEvent} from 'react'
import axios from 'axios'

// Material-UI
import { Button } from '@material-ui/core'
import Fade from '@material-ui/core/Fade';

// Interfaces
import { IuserInfo, UserRole } from '../../../interfaces/userInfo'

export const AssignInstructor: FC<{setToggle: Function, instructorID: string | undefined | null, getOneSubject: Function, subjectID: string, setChecked2: Function, checked2: boolean}> = ({setToggle, instructorID, getOneSubject, subjectID, checked2, setChecked2}) => {

    const [toBeInstructor, setToBeInstructor] = useState(instructorID)
    const [usersOptions, setUsersOptions] = useState<{data: IuserInfo[]}>({
        data: []
    })

    const getAllUsers = async () => {
        const {data} = await axios.post<{data: {allUsers: IuserInfo[]}}>('http://localhost:8000/graphql', {
            query: `query allUsers {
                allUsers {
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
            }`
        })

        if (data.data.allUsers) {
            setUsersOptions({
                data: data.data.allUsers
            })
        }

    }

    const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setToBeInstructor(e.currentTarget.value)
    }

    const assignToSubject = async () => {
        
        try {

            await axios.post('http://localhost:8000/graphql', {
                query: `mutation assignInstructor($subjectID: ID!, $instructorID: ID!) {
                    assignInstructor(subjectID: $subjectID, instructorID: $instructorID) {
                        name
                        description
                        instructor {
                            firstName
                            middleName
                            lastName
                        }
                    }
                }`,
                variables: {
                    subjectID,
                    instructorID: toBeInstructor
                }
        })

        await getOneSubject()
        setToggle(false)
            
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getAllUsers()
    },[])

    return (
        <Fade in={checked2}>
            <div>
                <form method="post">
                    <select style={{margin: '1rem 0rem', padding: '0.5rem'}} onChange={handleInputChange} >
                        <option value={instructorID!}> Default </option>
                        {usersOptions.data.filter(item => {
                            return item.role !== UserRole.ADMIN && item.role !== UserRole.STUDENT
                        }).map(item => {
                            return <option key={item._id} value={item._id}> {item.firstName} {item.lastName} </option>
                        })}
                    </select>
                    <span> <Button onClick={assignToSubject} style={{marginLeft: '0.5rem'}} color="primary" variant="contained" > Assign </Button> <Button color="secondary" variant="contained" onClick={() => {
                        setToggle(false)
                        setChecked2(false)
                    }} > Cancel </Button> </span>
                </form>
            </div>
        </Fade>
    )

}