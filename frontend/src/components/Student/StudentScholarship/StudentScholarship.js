import * as React from "react";
import { useState, Fragment, useEffect } from "react";
import "./StudentScholarship.css";
import { State } from "country-state-city";
import SidebarStudent from "../SidebarStudent/SidebarStudent";
import { submitScholarship } from "../../../actions/studentAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { clearMessages } from "../../../actions/adminAction";

const StudentScholarship = () => {
  const dispatch = useDispatch();
  const [studentState, setStudentState] = useState();
  const [session, setSession] = useState();
  const [name, setName] = useState();
  const [document, setDocument] = useState("");

  const {
    loading: uploading,
    message,
    error,
  } = useSelector((state) => state.marksFeesCourseUpdate);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessages());
    }
  }, [error, message]);

  const documentChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setDocument(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitScholarshipDetails = () => {
    if (session.trim() === "") {
      return toast.error("Fill session properly");
    }
    if (studentState.trim() === "") {
      return toast.error("Fill state properly");
    }
    if (name.trim() === "") {
      return toast.error("Fill name of scholarship properly");
    }
    dispatch(submitScholarship(session, studentState, name, document));
  };

  return (
    <Fragment>
      {uploading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="scholarshipStudent">
            <SidebarStudent />
            <div>
              <div>
                <select
                  required
                  value={studentState}
                  onChange={(e) => setStudentState(e.target.value)}>
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry("IN").map((item) => (
                      <option key={item.isoCode} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Name of Scholarship"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Session"
                  required
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                />
              </div>
              <div>
                <label>Document Upload(Optional)</label>
                <input type="file" accept="pdf/*" onChange={documentChange} />
              </div>
              <div>
                <button onClick={submitScholarshipDetails}>Submit</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default StudentScholarship;
