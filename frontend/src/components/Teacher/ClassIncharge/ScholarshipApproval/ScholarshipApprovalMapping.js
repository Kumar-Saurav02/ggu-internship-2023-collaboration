import React, { Fragment, useEffect } from "react";
import Loader from "../../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./ScholarshipApproval.css";
import {
  scholarshipAcceptByIncharge,
  scholarshipRejectByIncharge,
} from "../../../../actions/teacherAction";
import { clearMessages } from "../../../../actions/adminAction";

const ScholarshipApprovalMapping = ({ data }) => {
  const dispatch = useDispatch();

  console.log(data.scholarshipDocument);
  const acceptScholarship = () => {
    if (data.scholarshipDocument === undefined) {
      dispatch(
        scholarshipAcceptByIncharge(
          data.session,
          data.state,
          data.scholarship,
          "",
          data.enrollmentNumber,
          data._id
        )
      );
    } else {
      dispatch(
        scholarshipAcceptByIncharge(
          data.session,
          data.state,
          data.scholarship,
          data.scholarshipDocument,
          data.enrollmentNumber,
          data._id
        )
      );
    }
  };

  const rejectScholarship = () => {
    dispatch(scholarshipRejectByIncharge(data._id));
  };

  return (
    <Fragment>
      <div>
        <div>
          <p>Enrollment Number :- {data.enrollmentNumber}</p>
        </div>
        <div>
          <p>Name:- {data.name}</p>
        </div>
        <div>
          <p>Semester:- {data.semester}</p>
        </div>
        <div>
          <p>Department:- {data.department}</p>
        </div>
        <div>
          <p>Scholarship Name:- {data.scholarship}</p>
        </div>
        <div>
          <p>Scholarship Session:- {data.session}</p>
        </div>
        <div>
          <p>Scholarship State:- {data.state}</p>
        </div>
        {data.scholarshipDocument && (
          <div>
            <p> Scholarship Document</p>
            <a
              target="_blank"
              rel="noreferrer"
              href={data.scholarshipDocument.url}>
              View
            </a>
          </div>
        )}
        {!data.scholarshipDocument && (
          <div>
            <p> Scholarship Document not uploaded</p>
          </div>
        )}
        <div>
          <button onClick={acceptScholarship}>Accept</button>
          <button onClick={rejectScholarship}>Reject</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ScholarshipApprovalMapping;
