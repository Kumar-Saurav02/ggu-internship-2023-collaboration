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

  const { student, loading, isAuthenticated } = useSelector(
    (state) => state.registerLoginStudents
  );

  useEffect(() => {
    dispatch(loadStudent());
  }, []);

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

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profileStudent">
            <SidebarStudent />
            <div>
              <div>
                <label>Enrollment No.</label>
                <p>{student.enrollmentNo}</p>
              </div>

              <div>
                <label>Name</label>
                <p>{student.name}</p>
              </div>

              <div>
                <label>Roll Number</label>
                <p>{student.rollNo}</p>
              </div>
              <div>
                <label>Aadhar Number</label>
                <p>{student.aadharNumber}</p>
              </div>
              <div>
                <label>Father's Name</label>
                <p>{student.fatherName}</p>
              </div>
              <div>
                <label>Mother's Name</label>
                <p>{student.motherName}</p>
              </div>
              <div>
                <label>Current Semester</label>
                <p>{student.currentSemester}</p>
              </div>
              <div>
                <label>Department</label>
                <p>{student.department}</p>
              </div>

              <div>
                <label>Course</label>
                <p>{student.course}</p>
              </div>

              <div>
                <label>Student Phone Number</label>
                <p>{student.mobileNumber}</p>
              </div>
              <div>
                <label>Gender</label>
                <p>{student.gender}</p>
              </div>

              <div>
                <label>Date of Birth</label>
                <p>{student.dateOfBirth}</p>
              </div>

              <div>
                <label>Date of Joining</label>
                <p>{student.dateOfJoining}</p>
              </div>
              <div>
                <label>Religion</label>
                <p>{student.religion}</p>
              </div>

              <div>
                <label>Category</label>
                <p>{student.category}</p>
              </div>

              <div>
                <label>Blood Group</label>
                <p>{student.bloodGroup}</p>
              </div>

              <div>
                <label>Physically Handicapped</label>
                <p>{student.physicallyHandicapped}</p>
              </div>
              <div>
                <label>Hosteler</label>
                <p>{student.hosteler}</p>
              </div>
              <div>
                <h2>Contact Details</h2>
                <hr></hr>
                <br></br>

                {student.localAddress && (
                  <div>
                    <label>Local Address</label>

                    <div>
                      <p>Address</p>
                      <p>{student.localAddress.address}</p>
                      <br></br>
                      <p>State</p>
                      <p>{student.localAddress.state}</p>
                      <br></br>
                      <p>Pin Code</p>
                      <p>{student.localAddress.pinCode}</p>
                      <br></br>
                    </div>
                  </div>
                )}

                {student.permanentAddress && (
                  <div>
                    <label>Permanent Address</label>

                    <div>
                      <p>Address</p>
                      <p>{student.permanentAddress.address}</p>
                      <br></br>
                      <p>State</p>
                      <p>{student.permanentAddress.state}</p>
                      <br></br>
                      <p>Pin Code</p>
                      <p>{student.permanentAddress.pinCode}</p>
                      <br></br>
                    </div>
                  </div>
                )}

                <div>
                  <label className="label_name">Father Mobile Number</label>
                  <p>{student.fatherMobileNumber}</p>
                </div>

                <div>
                  <label className="label_name">Mother Mobile Number</label>
                  <p>{student.motherMobileNumber}</p>
                </div>
              </div>

              <div>
                <div>
                  <h2>Photographs</h2>
                  <hr></hr>
                  <br></br>

                  {student.photoUpload && (
                    <div>
                      <label className="label_name">Photo</label>
                      <img src={student.photoUpload.url} />
                    </div>
                  )}

                  {student.signatureUpload && (
                    <div>
                      <label className="label_name">Signature</label>
                      <img src={student.signatureUpload.url} />
                    </div>
                  )}
                </div>
                <div>
                  <p>Fee Details</p>
                  {feePaid &&
                    student.feeDetails &&
                    student.feeDetails.map((fee) => {
                      {
                        fee.semester === student.currentSemester && (
                          <div>
                            <p>Bank Name:- {fee.bankName}</p>
                            <p>IFSC Code:- {fee.ifscCode}</p>
                            <p>Amount:- {fee.amount}</p>
                            <p>Challan ID:- {fee.challanID}</p>
                            <p>Date:- {fee.dateOfPayment}</p>
                          </div>
                        );
                      }
                    })}
                  {!feePaid && (
                    <div>
                      <p>Fees is not paid for current semester.</p>
                    </div>
                  )}
                </div>
                <div>
                  <p>Marks Details</p>
                  {student.marksDetails &&
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
                <div>
                  <p>Attendance Details</p>
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
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProfileStudent;
