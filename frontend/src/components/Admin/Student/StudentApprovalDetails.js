import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";

const StudentApprovalDetails = () => {
  const { state } = useLocation();
  console.log(state.dateOfBirth.split("T")[0]);
  return (
    <Fragment>
      <Sidebar />

      <div className="approvBox">

          <div className="subsection">
                      
                        <h2>Student Details</h2>
                        <hr></hr>
                        <br></br>
                        

                        <div className="entry">
                          <label
                            className="label_name"
                            >
                            Enrollement No.
                          </label>
                          <p>{state.enrollmentNo}</p>
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
                            Roll Number
                          </label>
                          <p>{state.rollNo}</p>
                        </div>

                        <div className="entry">
                          <label
                            className="label_name"
                            >
                            Aadhar Number
                          </label>
                          <p>{state.aadharNumber}</p>
                        </div>

                        <div className="entry">
                          <label
                            className="label_name"
                            >
                            Father's Name
                          </label>
                          <p>{state.fatherName}</p>
                        </div>

                        <div className="entry">
                          <label
                            className="label_name"
                            >
                            Mother's Name
                          </label>
                          <p>{state.motherName}</p>
                        </div>

                        {/* yahan branch name hoga and the department name 2 more field need to be added*/}
                        <div className="entry">
                          <label
                            className="label_name"
                            >
                            Current Semester
                          </label>
                          <p>{state.currentSemester}</p>
                        </div>

                        <div className="entry">
                          <label
                            className="label_name"
                            >
                            Student Phone Number
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
                          <label
                            className="label_name"
                            >
                            Date of Joining
                          </label>
                          <p>{state.dateOfJoining.split("T")[0]}</p>
                        </div>

                        <div className="entry">
                          <label
                            className="label_name"
                            >
                            Religion
                          </label>
                          <p>{state.religion}</p>
                        </div>
                        
                        <div className="entry">
                          <label
                            className="label_name"
                            >
                            Category
                          </label>
                          <p>{state.category}</p>
                        </div>

                        <div className="entry">
                          <label
                            className="label_name"
                            >
                            blood Group
                          </label>
                          <p>{state.bloodGroup}</p>
                        </div>

                        <div className="entry">
                          <label
                            className="label_name"
                            >
                            physically Handicapped
                          </label>
                          <p>{state.physicallyHandicapped}</p>
                        </div>

                        <div className="entry">
                          <label
                            className="label_name"
                            >
                            Hosteler
                          </label>
                          <p>{state.hosteler}</p>
                        </div>

                        
              
          </div>


          <div className="subsection">
              <h2>Contact Details</h2>
                          <hr></hr>
                          <br></br>
                          
              <div className="entry">
                              <label className="label_name" >
                                Local Address
                              </label>

                              <div className="address" >
                                  <p>{state.localAddress.address}</p>
                                  <br></br>
                                  <p>{state.localAddress.state}</p>
                                  <br></br>
                                  <p>{state.localAddress.pinCode}</p>
                                  <br></br>
                              </div>
              </div>

              <div className="entry">
                              <label className="label_name" >
                                Permanent Address
                              </label>

                              <div className="address" >
                                  <p>{state.permanentAddress.address}</p>
                                  <br></br>
                                  <p>{state.permanentAddress.state}</p>
                                  <br></br>
                                  <p>{state.permanentAddress.pinCode}</p>
                                  <br></br>
                              </div>
              </div>

              <div className="entry">
                          <label
                            className="label_name"
                            >
                            Father Mobile Number
                          </label>
                          <p>{state.fatherMobileNumber}</p>
              </div>

              <div className="entry">
                          <label
                            className="label_name"
                            >
                            Mother Mobile Number
                          </label>
                          <p>{state.motherMobileNumber}</p>
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
                          <img src={state.photoUpload.url} />

                        </div>

                        <div className="entry">
                          <label className="label_name" >
                            Signature 
                          </label>
                          <img src={state.signatureUpload.url} />

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

export default StudentApprovalDetails;
