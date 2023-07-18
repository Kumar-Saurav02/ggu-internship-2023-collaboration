import React, { Fragment, useEffect, useState } from "react";
import "./CreateSubject.css";
import { useDispatch, useSelector } from "react-redux";
import { createSubjectByHOD } from "../../../../actions/hodAction";
import Loader from "../../../Loader/Loader";
import { toast } from "react-toastify";
import SidebarTeacher from "../../SidebarTeacher/SidebarTeacher";

const CreateSubject = () => {
  const dispatch = useDispatch();

  const { loading, message, error } = useSelector(
    (state) => state.createSubjectByHOD
  );

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const [detailsSubject, setDetailsSubject] = useState({
    subjectName: "",
    subjectCode: "",
    subjectCredit: "",
  });

  const { subjectName, subjectCode, subjectCredit } = detailsSubject;

  const createSubjectDataChange = (e) => {
    setDetailsSubject({ ...detailsSubject, [e.target.name]: e.target.value });
  };

  const createSubject = () => {
    if (
      subjectName.trim() === "" ||
      subjectCode.trim() === "" ||
      subjectCredit.trim() === ""
    ) {
      return toast.error("Fill fields properly");
    }
    dispatch(
      createSubjectByHOD(
        subjectName.trim(),
        subjectCode.trim(),
        subjectCredit.trim()
      )
    );
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      setDetailsSubject({
        subjectName: "",
        subjectCode: "",
        subjectCredit: "",
      });
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="createSubject">
            <SidebarTeacher role={teacher.subRole}/>
            <div className="registerBox">
              <div className="Data_entry">
              <h2>Create Subject</h2>
              <hr></hr>
              <br></br>
              <div className="entry">
                    <label className="label_name" for="{subjectName}">
                      Subject Name
                    </label>
                    <input
                    className="label_name"
                    type="text"
                    placeholder="Subject Name"
                    required
                    name="subjectName"
                    value={subjectName}
                    onChange={createSubjectDataChange}
                  />
                </div>
                <div className="entry">
                    <label className="label_name" for="{subjectCode}">
                      Subject Code
                    </label>
                    <input
                    className="label_name"
                    type="text"
                    placeholder="Subject Code"
                    required
                    name="subjectCode"
                    value={subjectCode}
                    onChange={createSubjectDataChange}
                  />
                </div>
                <div className="entry">
                    <label className="label_name" for="{subjectCredit}">
                      Subject Credit
                    </label>
                    <input
                    className="label_name"
                    type="number"
                    placeholder="Subject Credit"
                    required
                    name="subjectCredit"
                    value={subjectCredit}
                    onChange={createSubjectDataChange}
                  />
                </div>
                <br></br>
                <div className="btn">
                  <button 
                    className="signInbtn border hover" 
                    onClick={createSubject}>Create
                  </button>
                </div>
                
              
            </div>
            </div>
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreateSubject;
