import * as React from 'react';
import { useState } from 'react';
import "./studentScholarship.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';


const StudentScholarship = () => {

    const [name, setName] = useState("");
    const [session, setSession] = useState("");
    const [state, setState] = React.useState("");
    const [data, setData] = useState([]);


    const addData = () => {
        setData([...data, { state, session, name }])
        setName("")
        setSession("")
        setState("")
    };

    function SubmitButton(){
        if (state && session && name){
          return <Button onClick={addData} color="success" variant="contained">Submit</Button>
        } else {
          return <Button onClick={()=> alert("Enter full Details !")} color="success" variant="contained">Submit</Button>



          
        };
      };

    

    const removeItem = (index) =>{
        let arr = data;
        arr.splice(index, 1);
        setData([...arr]);
    };


    return (
        <div className='full'>
            <div className='first'>
                <span className='heading'> <h2>Scholarship Details</h2> </span>
                <Stack dirrection="row" spacing={1}>
                    <h3 id className='titles'>Select State</h3>
                    <FormControl fullwidth>
                        <InputLabel id="demo-simple-select-label">State</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={state}
                            label="State"
                            onChange={(event) => setState(event.target.value)}
                        >
                            <MenuItem value={"Bihar"}>Assam</MenuItem>
                            <MenuItem value={2}>Bihar</MenuItem>
                            <MenuItem value={3}>Jharkhand</MenuItem>
                        </Select>
                    </FormControl>

                    <h3 id className='titles'>Session</h3>
                    <input
                        type="text"
                        placeholder="Session (e.g. 20xx-yy)"
                        required
                        value={session}
                        onChange={(event) => setSession(event.target.value)}
                    />
                    <h3 id className='titles'>Name Of Scholarship</h3>
                    <input
                        type="text"
                        placeholder="Name of Scholarship"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />


                    <SubmitButton/>
                </Stack>
            </div>

            <div className='showdata'>
                <div className='Field_data_val'>
                    <span className='data_n_title'><h4>State</h4></span>
                    <span className='data_n_title'><h4>Session</h4></span>
                    <span className='data_n_title'><h4>Name of Scholarship</h4></span>
                    <span className='data_n_title'><h4>Remove</h4></span>
                    

                </div>
                {
                    data.map((element, index) => {
                        return (
                        
                            <div key={index} className='show_data_val'>
                                <span className='data_n_title'><h4> {element.state} </h4></span>
                                <span className='data_n_title'><h4> {element.session} </h4></span>
                                <span className='data_n_title'><h4> {element.name} </h4></span>
                                
                                <Button onClick={()=>removeItem(index)} color="error" variant="contained" ><DeleteIcon /></Button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default StudentScholarship