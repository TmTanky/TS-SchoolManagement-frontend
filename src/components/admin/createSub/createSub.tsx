import {FC, useState, useEffect, ChangeEvent} from 'react'
import axios from 'axios'

// Material-UI
import { Fade, TextField, Button, TextareaAutosize } from '@material-ui/core'
import { IuserInfo, UserRole } from '../../../interfaces/userInfo'

export const AdminCreateSub: FC<{setToggle: Function, toggle: boolean, getSubjects: Function}> = ({setToggle, toggle, getSubjects}) => {

    const [allTeachers, setAllTeachers] = useState<IuserInfo[]>([])
    const [selectedTeacher, setSelectedTeacher] = useState("")
    const [subDetails, setSubDetails] = useState({
        name: "",
        description: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target

        setSubDetails({
            ...subDetails,
            [name]: value
        })
    }

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeacher(e.currentTarget.value)
    }

    const submitSubject = async () => {
        
        try {

            const {data} = await axios.post('https://schoolmanagement-gql.herokuapp.com/graphql', {
                query: `mutation createSubject($name: String!, $description: String!, $instructor: ID) {
                    createSubject(name: $name, description: $description, instructor: $instructor) {
                        name
                        description
                    }
                }`,
                variables: {
                    name: subDetails.name,
                    description: subDetails.description,
                    instructor: selectedTeacher
                }
            })

            console.log(data)

            await getSubjects()
            setSubDetails({
                name: "",
                description: ""
            })
            setToggle(false)
            
        } catch (err) {
            console.log(err)
        }

    } 

    const getAllTeachers = async () => {

        try {

            const {data} = await axios.post<{data: {allUsers: IuserInfo[] }}>('https://schoolmanagement-gql.herokuapp.com/graphql', {
                query: `query allUsers {
                    allUsers {
                        _id
                        firstName
                        middleName
                        lastName
                        role
                    }
                }`
            })

            if (data.data.allUsers) {
                setAllTeachers(data.data.allUsers)
            }
            
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getAllTeachers()
    },[])

    return (
        <div className="createsubbox">
            <Fade in={toggle}>
                <form className="createsubform" method="post">
                    <TextField value={subDetails.name} name="name" onChange={handleChange} style={{margin: '0.5rem 0rem'}} label="Name" />
                    <TextareaAutosize value={subDetails.description} name="description" onChange={handleChange} placeholder="Subject Description" style={{padding: '0.5rem'}} rowsMin={10} />

                    <label style={{marginTop: '1rem'}} htmlFor="teachers"> Select Instructor </label>
                    <select onChange={handleSelectChange} name="teachers">
                        <option value={undefined}> None </option>
                        {allTeachers.filter(item => item.role === UserRole.TEACHER).map(item => {
                            return <option key={item._id} value={item._id}> {item.firstName} {item.lastName} </option>
                        })}
                    </select>

                    <div className="createsubbtns">
                        <span> <Button disabled={subDetails.name === "" || subDetails.description === ""} onClick={submitSubject} color="primary" style={{margin: '0rem 0.2rem '}} variant="contained" > Create </Button>
                        <Button onClick={() => setToggle(false)} color="secondary" style={{margin: '0rem 0.2rem '}} variant="contained" > Cancel </Button> </span>
                    </div>
                </form>
            </Fade>
        </div>
    )

}