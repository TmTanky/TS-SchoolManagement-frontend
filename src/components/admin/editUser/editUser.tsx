import {FC} from 'react'

// Material-UI
import { TextField, Button } from '@material-ui/core'

// CSS
import './editUser.css'

export const EditUserComponent: FC<{ setToggle: Function, fname: string, mname: string, lname: string }> = ({setToggle, fname, mname, lname}) => {

    return (
        <div className="edituserform">
            <form method="post" className="editname" >
                <h1 style={{textAlign: 'center'}} > Edit Name </h1>
                <TextField value={fname} type="text" style={{marginBottom: '0.5rem'}} label="First Name" />
                <TextField value={mname} type="text" style={{marginBottom: '0.5rem'}} label="Middle Name" />
                <TextField value={lname} type="text" style={{marginBottom: '0.5rem'}} label="Last Name" />
                <Button style={{marginTop: '1rem'}} color="primary" variant="contained" > Confirm </Button>
            </form>

            <div className="canceledituser">
                <Button onClick={() => setToggle(false)} color="secondary" variant="contained" > Cancel </Button>  
            </div>
        </div>
    )

}