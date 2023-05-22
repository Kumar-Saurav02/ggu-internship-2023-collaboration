import * as React from "react";
import { useState } from "react";
import "./DocumentUpload.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";

const DocumentUpload = () => {
  const [selectedOption, setSelectedOption] = React.useState("");
  const [cgpaValue, setCgpaValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [data, setData] = useState([]);

  const addData = () => {
    setData([...data, { selectedOption, cgpaValue , selectedFile}]);
    setSelectedFile("")
    setCgpaValue("");
    setSelectedOption("");
  };

  function SubmitButton() {
    if (selectedOption && cgpaValue && selectedFile) {
      return (
        <Button onClick={addData} color="success" variant="contained">
          Submit
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => alert("Enter full Details !")}
          color="success"
          variant="contained">
          Submit
        </Button>
      );
    }
  }

  const removeItem = (index) => {
    let arr = data;
    arr.splice(index, 1);
    setData([...arr]);
  };

  return (
    <div className="full_Sdocument">
      <div className="first_Sdocument">
        <div className="headingt_Sdocument">
          {" "}
          <h2>Document Upload</h2>{" "}
        </div>
        <div className="filldata_Sdoucment">
          <Stack dirrection="row" spacing={1}>
            <h3 id className="titles_Sdoucment">
              Select Semester
            </h3>

            <FormControl fullwidth>
              <InputLabel id="demo-simple-select-label">Semester</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedOption}
                label="State"
                onChange={(event) => setSelectedOption(event.target.value)}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
              </Select>
            </FormControl>
            <h3 id className="titles_Sdoucment">
              CGPA
            </h3>
            <input
              className="input_Sdocument"
              type="Number"
              placeholder="Enter Cgpa"
              required
              value={cgpaValue}
              onChange={(event) => setCgpaValue(event.target.value)}
            />

            <h3 id className="titles_Sdoucment">
              Document Upload
            </h3>
            <input
              type="file"
              required
              name="document-file"
              value={selectedFile}
              onChange={(event) => setSelectedFile(event.target.value)}
            />

            
            <div class="submitbtn_Sdoucment">
              <SubmitButton />
            </div>
          </Stack>
        </div>
      </div>

      <div className="showdata_Sdoucment">
        <div className="Field_data_val_Sdoucment">
          <div className="data_n_title_Sdoucment">
            <h4>Semster</h4>
          </div>
          <div className="data_n_title_Sdoucment">
            <h4>CGPA</h4>
          </div>
          <div className="data_n_title_Sdoucment">
            <h4>Document</h4>
          </div>
          <div className="data_n_title_Sdoucment">
            <h4>Remove</h4>
          </div>
        </div>
        {data.map((element, index) => {
          return (
            <div key={index} className="Field_data_val_show_Sdoucment">
              <div className="data_n_title_Sdoucment">
                <h5> {element.selectedOption} </h5>
              </div>
              <div className="data_n_title_Sdoucment">
                <h5> {element.cgpaValue} </h5>
              </div>
              <div className="data_n_title_Sdoucment">
                <h5>
                  {" "}
                  <a href="/api/documentView">view</a>{" "}
                </h5>
              </div>
              <div className="data_n_title_Sdoucment">
                <Button
                  className="btn"
                  onClick={() => removeItem(index)}
                  color="error"
                  variant="contained">
                  <DeleteIcon fontSize="small" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentUpload;

