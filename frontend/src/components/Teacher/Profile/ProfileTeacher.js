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

  useEffect(() => {
    dispatch(loadTeacher());
  }, []);

  console.log(teacher);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profileTeacher">
            <SidebarTeacher />
            <div>
              <div>
                <label>Employee ID</label>
                <p>{teacher.employeeID}</p>
              </div>

              <div>
                <label>Name</label>
                <p>{teacher.name}</p>
              </div>

              <div>
                <label>Email</label>
                <p>{teacher.email}</p>
              </div>

              <div>
                <label>Mobile Number</label>
                <p>{teacher.mobileNumber}</p>
              </div>
              <div>
                <label>Gender</label>
                <p>{teacher.gender}</p>
              </div>
              <div>
                <label>Department</label>
                <p>{teacher.department}</p>
              </div>
              <div>
                <label>Designation</label>
                <p>{teacher.designation}</p>
              </div>

              <div>
                <label>Date OF Birth</label>
                <p>{teacher.dateOfBirth}</p>
              </div>
              <div>
                <label>Qualification</label>
                <p>{teacher.qualification}</p>
              </div>
              <div>
                <label>Assigned Subjects</label>
                {teacher.assignSubject &&
                  teacher.assignSubject.map((subject, i) => (
                    <div key={i}>
                      <p>{i + 1}</p>
                      <p>{subject}</p>
                    </div>
                  ))}
              </div>
              {teacher.profilePhoto && (
                <div>
                  <label>Profile Photo</label>
                  <img src={teacher.profilePhoto.url} />
                </div>
              )}
              {teacher.signature && (
                <div>
                  <label>Signature</label>
                  <img src={teacher.signature.url} />
                </div>
              )}
              {teacher.resume && (
                <div>
                  <label>Resume</label>
                  <br></br>
                  <a target="_blank" rel="noreferrer" href={teacher.resume.url}>
                    View
                  </a>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProfileTeacher;
