import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";

const TeacherApprovalDetails = () => {
  const { state } = useLocation();
  return (
    <Fragment>
      <Sidebar />
      <div className="approvBox">

        <div className="subsection">
            <h2>Teacher's Details</h2>
            <hr></hr>
            <br></br>
            
            <div className="entry">
               <label
                  className="label_name"
                >
                  Employee ID
                  </label>
                  <p>{state.employeeID}</p>
            </div>
            
            <div className="entry">
               <label
                  className="label_name"
                >
                  Name
                  </label>
                  <p>{state.name}</p>
            </div>
            
            <div className="entry">
               <label
                  className="label_name"
                >
                  Email
                  </label>
                  <p>{state.email}</p>
            </div>
           
            <div className="entry">
               <label
                  className="label_name"
                >
                  Department
                  </label>
                  <p>{state.department}</p>
            </div>
            
            <div className="entry">
               <label
                  className="label_name"
                >
                  Designation
                  </label>
                  <p>{state.designation}</p>
            </div>

            <div className="entry">
               <label
                  className="label_name"
                >
                  Phone Number
                  </label>
                  <p>{state.mobileNumber}</p>
            </div>
            
            <div className="entry">
               <label
                  className="label_name"
                >
                  Gender
                  </label>
                  <p>{state.gender}</p>
            </div>
            
            <div className="entry">
               <label
                  className="label_name"
                >
                  DoB
                  </label>
                  <p>{state.dateOfBirth.split("T")[0]}</p>
            </div>
            
            <div className="entry">
                              <label className="label_name" >
                               Assigned Subject
                              </label>

                              <div className="address" >
                                { state.assignSubject &&
                                    state.assignSubject.map((subject) => (
                                      <div>
                                        <p><b>Subject:</b></p>
                                        <p>{subject}</p>
                                        <br></br>
                                      </div>
                                    ))}
                              </div>
            </div>

            <div className="entry">
               <label
                  className="label_name"
                >Resume</label>
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
                          <label className="label_name" >
                            Photo 
                          </label>
                          <img src={state.profilePhoto.url} />

                        </div>

                        <div className="entry">
                          <label className="label_name" >
                            Signature 
                          </label>
                          <img src={state.signature.url} />

                        </div>
                </div>
        </div>

        <div className="btn">
              <button class="signInbtn border hover">Reject</button>
              <button class="signInbtn border hover">Accept</button>
                      
        </div>

      </div>
    </Fragment>
  );
};


{/* 
        <div>
          <h3>Employee ID: </h3>
          <p>{state.employeeID}</p>
        </div>
        <div>
          <h3>Name: </h3>
          <p>{state.name}</p>
        </div>
        <div>
          <h3>Email: </h3>
          <p>{state.email}</p>
        </div>
        <div>
          <h3>Mobile Number: </h3>
          <p>{state.mobileNumber}</p>
        </div>
        <div>
          <h3>Gender: </h3>
          <p>{state.gender}</p>
        </div>
        <div>
          <h3>Department: </h3>
          <p>{state.department}</p>
        </div>
        <div>
          <h3>Designation: </h3>
          <p>{state.designation}</p>
        </div>
        <div>
          <h3>Date Of Birth: </h3>
          <p>{state.dateOfBirth.split("T")[0]}</p>
        </div>
        <div>
          <h3>Assigned Subjects</h3>
          {state.assignSubject &&
            state.assignSubject.map((subject) => (
              <div>
                <h3>Subject: </h3>
                <p>{subject}</p>
              </div>
            ))}
        </div>
        <div>
          <h3>Profile Photo: </h3>
          <img src={state.profilePhoto.url} />
        </div>
        <div>
          <h3>Signature: </h3>
          <img src={state.signature.url} />
        </div>
        
        <div>
          <button>Accept</button>
          <button>Reject</button>
        </div> */}





export default TeacherApprovalDetails;
