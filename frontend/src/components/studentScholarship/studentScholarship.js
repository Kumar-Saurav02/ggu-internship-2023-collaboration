import * as React from 'react';
import { useState } from 'react';
import "./StudentScholarship.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';


const Scholarship = () => {

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
        <div className='full_scholarship'>
            <div className='first_scholarship'>
                <div className='heading_scholarship'> <h2>Scholarship Details</h2> </div>
                <div className='filldata_scholarship'> 
                    <Stack dirrection="row" spacing={1}>
                        <h3 id className='titles_scholarship'>Select State</h3>
                    
                    <FormControl fullwidth>
                        <InputLabel id="demo-simple-select-label">State</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={state}
                            label="State"
                            onChange={(event) => setState(event.target.value)}
                        >     
                        <MenuItem value={'Andhra Pradesh'}>Andhra Pradesh</MenuItem>
                        <MenuItem value={'Andaman and Nicobar Islands'}>Andaman and Nicobar Islands</MenuItem>
                        <MenuItem value={'Arunachal Pradesh'}>Arunachal Pradesh</MenuItem>
                        <MenuItem value={'Assam'}>Assam</MenuItem>
                        <MenuItem value={'Bihar'}>Bihar</MenuItem>
                        <MenuItem value={'Chandigarh'}>Chandigarh</MenuItem>
                        <MenuItem value={'Chattisgarh'}>Chattisgarh</MenuItem>
                        <MenuItem value={'Dadra and Nagar Haveli and Daman & Diu'}>Dadra and Nagar Haveli and Daman & Diu </MenuItem>
                        <MenuItem value={'Delhi'}>Delhi</MenuItem>
                        <MenuItem value={'Goa'}>Goa</MenuItem>
                        <MenuItem value={'Gujrat'}>Gujrat</MenuItem>
                        <MenuItem value={'Haryana'}>Haryana</MenuItem>
                        <MenuItem value={'Himachal Pradesh'}>Himachal Pradesh</MenuItem>
                        <MenuItem value={'Jammu & Kashmir'}>Jammu & Kashmir</MenuItem>
                        <MenuItem value={'Jharkhand'}>Jharkhand</MenuItem>
                        <MenuItem value={'Karnataka'}>Karnataka</MenuItem>
                        <MenuItem value={'Kerala'}>Kerala</MenuItem>
                        <MenuItem value={'Ladakh'}>Ladakh</MenuItem>
                        <MenuItem value={'Lakshadweep'}>Lakshadweep</MenuItem>
                        <MenuItem value={'Madhya Pradesh'}>Madhya Pradesh</MenuItem>
                        <MenuItem value={'Maharashtra'}>Maharashtra</MenuItem>
                        <MenuItem value={'Manipur'}>Manipur</MenuItem>
                        <MenuItem value={'Meghalaya'}>Meghalaya</MenuItem>
                        <MenuItem value={'Mizoram'}>Mizoram</MenuItem>
                        <MenuItem value={'Nagaland'}>Nagaland</MenuItem>
                        <MenuItem value={'Odisha'}>Odisha</MenuItem>
                        <MenuItem value={'Puducherry'}>Puducherry</MenuItem>
                        <MenuItem value={'Punjab'}>Punjab</MenuItem>
                        <MenuItem value={'Rajsthan'}>Rajsthan</MenuItem>
                        <MenuItem value={'Sikkim'}>Sikkim</MenuItem>
                        <MenuItem value={'Tamil Nadu'}>Tamil Nadu</MenuItem>
                        <MenuItem value={'Telangana'}>Telangana</MenuItem>
                        <MenuItem value={'Tripura'}>Tripura</MenuItem>
                        <MenuItem value={'Uttarakhand'}>Uttarakhand</MenuItem>
                        <MenuItem value={'Uttar Pradesh'}>Uttar Pradesh</MenuItem>
                        <MenuItem value={'West Bengal'}>West Bengal</MenuItem>
                        </Select>
                    </FormControl>
                    <h3 id className='titles_scholarship'>Session</h3>
                    <input
                        className='input_scholarship'
                        type="text"
                        placeholder="Session (e.g. 20xx-yy)"
                        required
                        value={session}
                        onChange={(event) => setSession(event.target.value)}
                    />
                                        
                    <h3 id className='titles_scholarship'>Name Of Scholarship</h3>
                    
                    <input
                        className='input_scholarship'
                        type="text"
                        placeholder="Name of Scholarship"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <div class='submitbtn_scholarship'>
                     <SubmitButton/>
                     </div>                                          
                </Stack>               
                </div>
            </div>
            
             
            <div className='showdata_scholarship'>
                <div className='Field_data_val_scholarship'>
                    <div className='data_n_title_scholarship'><h4>State</h4></div>
                    <div className='data_n_title_scholarship'><h4>Session</h4></div>
                    <div className='data_n_title_scholarship'><h4>Name of Scholarship</h4></div>
                    <div className='data_n_title_scholarship'><h4>Remove</h4></div>
                    
                </div>
                {
                    data.map((element, index) => {
                        return (
                            <div key={index} className='Field_data_val_show_scholarship'>
                                <div className='data_n_title_scholarship'><h5> {element.state} </h5></div>
                                <div className='data_n_title_scholarship'><h5> {element.session} </h5></div>
                                <div className='data_n_title_scholarship'><h5> {element.name} </h5></div>
                                <div className='data_n_title_scholarship'>
                                    <Button className='btn_scholarship'   onClick={()=>removeItem(index)} color="error" variant="contained" ><DeleteIcon fontSize='small'/></Button></div>
                                
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Scholarship