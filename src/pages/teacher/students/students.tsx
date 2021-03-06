import {FC, useEffect, useState, useCallback} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

// Material-UI
import { CircularProgress, Fade } from '@material-ui/core'

// Interfaces
import { Istate } from '../../../interfaces/state'
import { IuserInfo } from '../../../interfaces/userInfo'

export const TeacherStudentPage: FC = () => {

    const [checked, setChecked] = useState(false)
    const userID = useSelector((state: Istate) => state.user.user._id)
    const [user, setUser] = useState<IuserInfo>({})

    const getOneUser = useCallback( async () => {

        try {

            const {data} = await axios.post<{data: {oneUser: IuserInfo}}>('https://schoolmanagement-gql.herokuapp.com/graphql', {
                query: `query oneUser($userID: ID!) {
                    oneUser(userID: $userID) {
                        _id
                        firstName
                        middleName
                        lastName
                        instructorsSubjects {
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
        getOneUser()
    },[getOneUser])


    return (
        <div>
            {checked ? <div>
                <Fade in={checked} >
                    <div>
                        <h1 style={{textAlign: 'center', padding: '2rem 0rem'}} > My Students </h1>
                            {user.instructorsSubjects?.length === 0 ? <h3 style={{padding: '4rem 0rem', textAlign: 'center'}} > (Ask for Admin for subjects.) </h3> : user.instructorsSubjects?.map(item => {
                                return <div key={item._id} className="inssubs" >
                                    <h1 style={{marginBottom: '0.5rem'}} > {item.name} </h1>
                                    {item.studentsWhoTake?.length === 0 ? <h3> No students take </h3> : 
                                    item.studentsWhoTake?.map(student => {
                                        return <li key={student._id} > {student.firstName} {student.lastName} </li>
                                    })}
                                </div>
                            })}
                    </div>
                </Fade>
            </div> : <div className="loading">
                <CircularProgress/>
            </div> }
        </div>
    )

}