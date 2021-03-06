import {FC, useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

// Material-UI
import { CircularProgress, Fade, Button } from '@material-ui/core'

// Interfaces
import { Isubject } from '../../../interfaces/subjects'

// Components
import { AdminCreateSub } from '../../../components/admin/createSub/createSub'

// CSS
import './subjects.css'

export const AllSubjects: FC = () => {

    const history = useHistory()
    const [openCreate, setOpenCreate] = useState(false)
    const [subjects, setSubjects] = useState<Isubject[]>([])
    const [checked, setChecked] = useState(false)

    const getSubjects = async () => {
        const {data} = await axios.post<{data: {allSubjects: Isubject[]}}>('https://schoolmanagement-gql.herokuapp.com/graphql', {
            query: `query allSubjects {
                allSubjects {
                    _id
                    name
                    description
                    studentsWhoTake {
                        _id
                        firstName
                        middleName
                        lastName
                        email
                        role
                    }
                }
            }`
        })

        if (data.data.allSubjects.length > 1) {
            setSubjects(data.data.allSubjects)
            setChecked(true)
        }

    }

    useEffect(() => {
        getSubjects()
    },[])

    return (
        <div>
            {subjects.length === 0 ? <div className="loading">
                <CircularProgress/>
            </div> : <div>
                <h1 style={{textAlign: 'center', padding: '3rem 0rem'}} > All Subjects </h1>

                <div className="createsub">
                    <Button onClick={() => setOpenCreate(true)} variant="contained" color="primary" > Create Subject </Button>
                </div>

                {openCreate ? <AdminCreateSub getSubjects={getSubjects} toggle={openCreate} setToggle={setOpenCreate} /> : ""}

                {subjects.map(item => {
                    return <Fade in={checked} key={item._id} >
                        <div className="onesub" >
                            <h1 style={{marginBottom: '1rem'}} > {item.name} </h1>
                            <p> {item.description} </p>
                            <span> <Button onClick={() => history.push(`/admin/subjects/edit/${item._id}`)} style={{marginTop: '1rem'}} variant="contained" color="primary" > Subject Details </Button> </span>
                        </div>
                    </Fade>
                })}
            </div> }
        </div>
    )

}