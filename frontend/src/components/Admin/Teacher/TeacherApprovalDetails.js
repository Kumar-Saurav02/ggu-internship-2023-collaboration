import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";

const TeacherApprovalDetails = () => {
  const { state } = useLocation();
  return (
    <Fragment>
      <div className="teacherDetails">
        <Sidebar />
        <div className="approvBox">
          <div className="subsection">
            <h2>Teacher's Details</h2>
            <hr></hr>
            <br></br>

            <div className="entry">
              <label className="label_name">Employee ID</label>
              <p>{state.employeeID}</p>
            </div>

            <div className="entry">
              <label className="label_name">Name</label>
              <p>{state.name}</p>
            </div>

            <div className="entry">
              <label className="label_name">Email</label>
              <p>{state.email}</p>
            </div>

            <div className="entry">
              <label className="label_name">Department</label>
              <p>{state.department}</p>
            </div>

            <div className="entry">
              <label className="label_name">Designation</label>
              <p>{state.designation}</p>
            </div>

            <div className="entry">
              <label className="label_name">Phone Number</label>
              <p>{state.mobileNumber}</p>
            </div>

            <div className="entry">
              <label className="label_name">Gender</label>
              <p>{state.gender}</p>
            </div>

            <div className="entry">
              <label className="label_name">DoB</label>
              <p>{state.dateOfBirth.split("T")[0]}</p>
            </div>

            <div className="entry">
              <label className="label_name">Assigned Subject</label>

              <div className="address">
                {state.assignSubject &&
                  state.assignSubject.map((subject) => (
                    <div>
                      <p>
                        <b>Subject:</b>
                      </p>
                      <p>{subject}</p>
                      <br></br>
                    </div>
                  ))}
              </div>
            </div>

            <div className="entry">
              <label className="label_name">Resume</label>
              <object data={state.resume.url}>Resume</object>
              <br></br>
              <a target="_blank" rel="noreferrer" href={state.resume.url}>
                Download Resume
              </a>
            </div>
          </div>

          <div className="subsection">
            <div>
              <h2>Photographs</h2>
              <hr></hr>
              <br></br>

              <div className="entry">
                <label className="label_name">Photo</label>
                <img src={state.profilePhoto.url} />
              </div>

              <div className="entry">
                <label className="label_name">Signature</label>
                <img src={state.signature.url} />
              </div>
            </div>
          </div>

          <div className="btn">
            <button class="signInbtn border hover">Reject</button>
            <button class="signInbtn border hover">Accept</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TeacherApprovalDetails;
