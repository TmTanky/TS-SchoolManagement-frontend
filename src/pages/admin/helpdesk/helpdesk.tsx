import {FC, useState, useEffect} from 'react'
import axios from 'axios'

// Material-UI
import { CircularProgress, Fade } from '@material-ui/core'

// Interfaces
import { Iconcern } from '../../../interfaces/concern'

// CSS
import './helpdesk.css'
import { Link } from 'react-router-dom'

export const AdminHelpDesk: FC = () => {

    const [checked, setChecked] = useState(false)
    const [allConcerns, setAllConcerns] = useState<Iconcern[]>([])

    const getAllConcerns = async () => {

        try {

            const {data} = await axios.post<{data: {allConcerns: Iconcern[]}}>('https://schoolmanagement-gql.herokuapp.com/graphql',{
                query: `query allConcerns {
                    allConcerns {
                        _id
                        title
                        concern
                        isResolved
                        ticketBy {
                          _id
                          firstName
                          middleName
                          lastName
                        }
                    }
                }`
            })

            if (data.data.allConcerns) {
                setAllConcerns(data.data.allConcerns)
                setChecked(true)
            }
            
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getAllConcerns()
    },[])

    return (
        <div>
            <h1 style={{textAlign: 'center', padding: '4rem 0rem'}} > All Tickets </h1>

            {checked ? <Fade in={checked} >
                <div>
                    {allConcerns.map(item => {
                        return <div key={item._id} className="tickets" >
                            <h2 style={{marginBottom: '1rem'}} > {item.title} </h2>
                            <Link to={`/admin/helpdesk/ticket/${item._id}`} > View </Link>
                        </div>
                    })}
                </div>
            </Fade> : <div className="loading">
                <CircularProgress/>
            </div> }

        </div>
    )

}