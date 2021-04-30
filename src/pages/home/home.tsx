import {FC, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios';

// Interfaces
import { Istate } from '../../interfaces/state';
import { UserRole } from '../../interfaces/userInfo';
import { Iannouncement } from '../../interfaces/announcements';

// Material-UI
import EditIcon from '@material-ui/icons/Edit';
import { Button, CircularProgress } from '@material-ui/core'
import Fade from '@material-ui/core/Fade';

// Components
import { CreateAnnouncement } from '../../components/admin/announcement/announcement'

// CSS
import './home.css'

export const HomePage: FC = () => {

    const user = useSelector((state: Istate) => state.user.user)
    const [checked, setChecked] = useState(false)
    const [create, setCreate] = useState(false)
    const [announce, setAnnounce] = useState<Iannouncement>({
        title: "",
        details: ""
    })
    const [announcements, setAnnouncements] = useState<{ datas: Iannouncement[] }>({
        datas: []
    })

    const getAllAnnouncement = async () => {
        const {data} = await axios.post<{data: {allAnnouncements: Iannouncement[]} }>('http://localhost:8000/graphql', {
            query: `query allAnnouncements {
                allAnnouncements {
                    _id
                    title
                    details
                }
            }`
        })

        if (data.data.allAnnouncements) {
            setAnnouncements({
                datas: data.data.allAnnouncements
            })
            setChecked(true)
        }

    }

    const createAnnouncement = () => {
        setCreate(true)
    }

    useEffect(() => {
        getAllAnnouncement()
    }, [])
    
    return (
        <div className="homebox">

            {user.role === UserRole.ADMIN || user.role === UserRole.TEACHER ? <Fade in={checked} >
                <header>
                    <h1 style={{marginBottom: '1rem'}} > Welcome {user.firstName}, to your Dashboard. {user.role === UserRole.ADMIN ? <EditIcon/> : ""} </h1>
                    <p style={{marginBottom: '0.5rem'}} > <strong> Note: </strong> </p>
                    <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quos provident quas perspiciatis. Saepe, adipisci qui nesciunt fuga id aut ipsam dignissimos sequi esse odio nemo cumque quis fugiat at? </p>
                </header>
            </Fade> : ""}

            {user.role === UserRole.STUDENT ? <header>
                <h1 style={{marginBottom: '1rem'}} > Welcome {user.firstName}, to your Dashboard. </h1>
            </header> : "" }
        
            {user.role === UserRole.ADMIN ? create ? <CreateAnnouncement getAllAnnouncement={getAllAnnouncement} details={announce} setDetails={setAnnounce} toggle={create} setToggle={setCreate} /> : <Fade in={checked} >
                <div className="createann">
                    <Button onClick={createAnnouncement} color="primary" variant="contained" > Create Announcement </Button>
                </div>
            </Fade> : "" }

            {announcements.datas.length === 0 ? <div className="loading">
                <CircularProgress/>
            </div> : <Fade in={checked}>
                <div className="allannouncements" >
                    {announcements.datas.map(item => {
                        return <div key={item._id} className="everyannouncement" >
                            <h1 style={{marginBottom: '1rem'}} > {item.title} </h1>
                            <p> {item.details} </p>
                        </div>
                    })}
                </div>
            </Fade> }
            
        </div>
    )

}



