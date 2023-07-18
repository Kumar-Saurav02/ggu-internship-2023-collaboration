import React, { Fragment, useEffect, useState } from "react";
import "./ProfileStudent.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarStudent from "../SidebarStudent/SidebarStudent";
import { loadStudent } from "../../../actions/studentAction";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { student, loading } = useSelector(
    (state) => state.registerLoginStudents
  );

  const [feePaid, setFeePaid] = useState(false);

  useEffect(() => {
    if (student !== undefined && student.feeDetails !== undefined) {
      for (let i = 0; i < student.feeDetails.length; i++) {
        if (student.feeDetails[i].semester === student.currentSemester) {
          setFeePaid(true);
        }
      }
    }
  }, [student]);

  const openEditWindow = () => {
    navigate("/editStudentProfile");
  };


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profileStudent">
            <SidebarStudent />
            <div className="approvBox">
              <div className="subsection">
              <h2>My Details</h2>
              <hr></hr>
              <br></br>
                  <div className="entry">
                    <label className="label_name">Name</label>
                    <p>{student.name}</p>
                  </div>

                  <div className="entry">
                    <label className="label_name">Enrollment No.</label>
                    <p>{student.enrollmentNo}</p>
                  </div>

                  <div className="entry">
                    <label className="label_name">Roll Number</label>
                    <p>{student.rollNo}</p>
                  </div>

                  <div className="entry">
                    <label className="label_name">Department</label>
                    <p>{student.department}</p>
                  </div>

                  <div className="entry">
                    <label className="label_name">Course</label>
                    <p>{student.course}</p>
                  </div>

                  <div className="entry">
                    <label className="label_name">Current Semester</label>
                    <p>{student.currentSemester}</p>
                  </div>

                  <div className="entry">
                    <label className="label_name">Aadhar Number</label>
                    <p>{student.aadharNumber}</p>
                  </div>

                  <div className="entry">
                    <label className="label_name">Father's Name</label>
                    <p>{student.fatherName}</p>
                  </div>

                  <div className="entry">
                    <label className="label_name">Mother's Name</label>
                    <p>{student.motherName}</p>
                  </div>
                  
                  <div className="entry">
                      <label className="label_name">Date of Birth</label>
                      <p>{student.dateOfBirth}</p>
                  </div>

                  <div className="entry">
                      <label className="label_name">Gender</label>
                      <p>{student.gender}</p>
                  </div>
                  
                  <div className="entry">
                      <label className="label_name">Addmition Date </label>
                      <p>{student.dateOfJoining}</p>
                  </div>

                  <div className="entry">
                      <label className="label_name">Religion</label>
                      <p>{student.religion}</p>
                  </div>
                  
                  <div className="entry">
                      <label className="label_name">Category</label>
                      <p>{student.category}</p>
                  </div>
                  
                  <div className="entry">
                      <label className="label_name">Blood Group</label>
                      <p>{student.bloodGroup}</p>
                  </div>
                  
                  <div className="entry">
                      <label className="label_name">Hosteler</label>
                      <p>{student.hosteler}</p>
                  </div>

                  <div className="entry">
                      <label className="label_name">Physically Handicapped</label>
                      <p>{student.physicallyHandicapped}</p>
                  </div>

                  
              </div>

              <div  className="subsection">
                <h2 >Contact Details</h2>
                <hr></hr>
                <br></br>
                
                <div className="entry">
                      <label className="label_name">Student Phone Number</label>
                      <p>{student.mobileNumber}</p>
                </div>

                <div className="entry">
                  <label className="label_name">Father's Mobile Number</label>
                  <p>{student.fatherMobileNumber}</p>
                </div>

                <div className="entry">
                  <label className="label_name">Mother's Mobile Number</label>
                  <p>{student.motherMobileNumber}</p>
                </div>

                {student.localAddress && (
                  <div className="entry">
                      <label
                        className="label_name"
                        for="{permanentAddressStudent}">
                        Local Address
                      </label>
                      <div className="address">
                        <p><em>Address</em></p>
                        <p>{student.localAddress.address}</p>
                        <br></br>
                        <p><em>State</em></p>
                        <p>{student.localAddress.state}</p>
                        <br></br>
                        <p><em>Pin Code</em></p>
                        <p>{student.localAddress.pinCode}</p>
                        <br></br> 
                      </div>
                   </div>
                    )}

                {student.permanentAddress && (
                  <div className="entry">
                   <label
                     className="label_name"
                     for="{permanentAddressStudent}">
                     Local Address
                   </label>
                   <div className="address">
                      <p><em>Address</em></p>
                      <p>{student.permanentAddress.address}</p>
                      <br></br>
                      <p><em>State</em></p>
                      <p>{student.permanentAddress.state}</p>
                      <br></br>
                      <p><em>Pin Code</em></p>
                      <p>{student.permanentAddress.pinCode}</p>
                      <br></br>
                    </div>
                  </div>
                )}
              </div>
              
              <div  className="subsection">
                <div>
                  <h2>Photographs</h2>
                  <hr></hr>
                  <br></br>

                  {student.photoUpload && (
                    <div  className="entry">
                      <label className="label_name">Photo</label>
                      <img src={student.photoUpload.url} />
                    </div>
                  )}

                  {student.signatureUpload && (
                    <div  className="entry">
                      <label className="label_name">Signature</label>
                      <img src={student.signatureUpload.url} />
                    </div>
                  )}
                </div>
              </div>

              <div className="subsection">
                  <h2>Others</h2>
                  <hr></hr>
                  <br></br>
                  <div className="entry" >
                      <p className="label_name" >Fee Details</p>
                      {feePaid &&
                        student.feeDetails &&
                        student.feeDetails.sort((p1, p2) =>
                      p1.semester > p2.semester
                        ? 1
                        : p1.semester < p2.semester
                        ? -1
                        : 0
                    ) &&
                        student.feeDetails.map((fee) => 
                          {
                            return (
                              <div>
                                <p>Semester:- {fee.semester}</p>
                                <p>Bank Name:- {fee.bankName}</p>
                                <p>IFSC Code:- {fee.ifscCode}</p>
                                <p>Amount:- {fee.amount}</p>
                                <p>Challan ID:- {fee.challanID}</p>
                                <p>Date:- {fee.dateOfPayment}</p>
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={fee.fees.url}>
                                  View
                                </a>
                              </div>
                            );
                          }
                        )}
                      {!feePaid && (
                        <div >
                          <p>Fees is not paid for current semester.</p>
                        </div>
                      )}
                    </div>
                    <div className="entry">
                      <p className="label_name">Marks Details</p>
                      {student.marksDetails &&
                        student.marksDetails.sort((p1, p2) =>
                          p1.semester > p2.semester
                            ? 1
                            : p1.semester < p2.semester
                            ? -1
                            : 0
                        ) &&
                        student.marksDetails.map((marks) => (
                          <div>
                            <p>Semester:- {marks.semester}</p>
                            <p>SGPA:- {marks.sgpa}</p>
                            <p>CGPA:- {marks.cgpa}</p>
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={marks.result.url}>
                              Download Result
                            </a>
                          </div>
                        ))}
                      {student.marksDetails && student.marksDetails.length === 0 && (
                        <div>
                          <p>No marks uploaded</p>
                        </div>
                      )}
                    </div>
                    <div className="entry">
                    <p className="label_name">Attendance Details</p>
                        {student.attendanceDetails &&
                          student.attendanceDetails.map((attendance) => (
                            <div>
                              <p>Semester:- {attendance.semester}</p>
                              <p>Attendance:- {attendance.attendance}</p>
                            </div>
                          ))}
                        {student.attendanceDetails &&
                          student.attendanceDetails.length === 0 && (
                            <div>
                              <p>No Attendance Available</p>
                            </div>
                          )}
                    </div>

                    <div>
                       <button onClick={openEditWindow}>Edit</button>
                    </div>

              </div>
 
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProfileStudent;
