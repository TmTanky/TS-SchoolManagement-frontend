import {FC, useState, useEffect, useCallback} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'

// Interfaces
import { IuserInfo } from '../../../interfaces/userInfo'
import { Istate } from '../../../interfaces/state'

// Material-UI
import { CircularProgress, Fade } from '@material-ui/core'
 
// CSS
import './subject.css'

export const StudentsSubjectPage: FC = () => {

    const [checked, setChecked] = useState(false)
    const userID = useSelector((state: Istate) => state.user.user._id)
    const [user, setUser] = useState<IuserInfo>({})

    const getUser = useCallback(async () => {

        try {

            const {data} = await axios.post<{data: {oneUser: IuserInfo}}>('https://schoolmanagement-gql.herokuapp.com/graphql', {
                query: `query oneUser($userID: ID!) {
                    oneUser(userID: $userID) {
                        firstName
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
            <h1 style={{padding: '4rem 0rem', textAlign: 'center'}} > My subjects </h1>

            {checked ? <Fade in={checked}>
                <div className="studentsubs">
                    {user.subjects?.map(sub => {
                        return <div key={sub._id} className="studentsub">
                            <h2> {sub.name} </h2>
                        </div>
                    })}
                </div>
            </Fade> : <div className="loading">
                <CircularProgress/>
            </div> }

        </div>
    )

}