import React, { Fragment, useEffect } from "react";
import SidebarTeacher from "../SidebarTeacher/SidebarTeacher";
import "./ProfileTeacher.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loadTeacher } from "../../../actions/teacherAction";

const ProfileTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacher, loading, isAuthenticated } = useSelector(
    (state) => state.registerLoginTeachers
  );

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profileTeacher">
            <SidebarTeacher role={teacher.subRole} />
            <div className="approvBox">
              <div className="subsection">
                <h2>Teacher's Profile</h2>
                <hr></hr>
                <br></br>
               <div className="entry">
                <label  className="label_name">Employee ID</label>
                <p>{teacher.employeeID}</p>
               </div>

              <div className="entry">
                <label className="label_name">Name</label>
                <p>{teacher.name}</p>
              </div>

              <div className="entry">
                <label className="label_name">Email</label>
                <p>{teacher.email}</p>
              </div>

              <div className="entry">
                <label className="label_name">Mobile Number</label>
                <p>{teacher.mobileNumber}</p>
              </div>
              <div className="entry">
                <label className="label_name">Gender</label>
                <p>{teacher.gender}</p>
              </div>
              <div className="entry">
                <label className="label_name"> Department</label>
                <p>{teacher.department}</p>
              </div>
              <div className="entry">
                <label className="label_name">Designation</label>
                <p>{teacher.designation}</p>
              </div>

              <div className="entry">
                <label className="label_name">Date OF Birth</label>
                <p>{teacher.dateOfBirth}</p>
              </div>
              <div className="entry">
                <label className="label_name">Qualification</label>
                <p>{teacher.qualification}</p>
              </div>
              <div className="entry">
                <label className="label_name">Assigned Subjects</label>
                <div className="address">
                {teacher.assignSubject &&
                  teacher.assignSubject.map((subject, i) => (
                    <div key={i}>
                      <p>
                      <b>{i + 1}</b>
                      </p>
                      <p>{subject}</p>
                      <br></br>
                  </div>
                  ))}
                </div>
              </div>
              {teacher.resume && (
                <div  className="entry">
                  <label className="label_name">Resume</label>
                  <br></br>
                  <a target="_blank" rel="noreferrer" href={teacher.resume.url}>
                    View
                  </a>
                </div>
              )}
              </div> 
          <div className="subsection">
                <div>
                <h2>Photograph & Signature</h2>
                  <hr></hr>
                  <br></br> 
              {teacher.profilePhoto && (
                <div className="entry">
                  <label className="label_name">Profile Photo</label>
                  <img src={teacher.profilePhoto.url} />
                </div>
              )}
              {teacher.signature && (
                <div className="entry">
                  <label className="label_name">Signature</label>
                  <img src={teacher.signature.url} />
                </div>
              )}
              {teacher.resume && (
                <div className="entry">
                  <label className="label_name">Resume</label>
                  <a target="_blank" rel="noreferrer" href={teacher.resume.url}>
                    View
                  </a>
                
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

export default ProfileTeacher;
