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

  const {
    loading,
    message: ApproveRejectMessage,
    error: ApproveRejectError,
  } = useSelector((state) => state.courseScholarshipCheck);

  useEffect(() => {
    if (ApproveRejectMessage) {
      toast.success(ApproveRejectMessage);
      dispatch(clearMessages());
    }
    if (ApproveRejectError) {
      toast.success(ApproveRejectError);
      dispatch(clearMessages());
    }
  }, [dispatch, ApproveRejectMessage, ApproveRejectError]);

  const acceptScholarship = () => {
    dispatch(scholarshipAcceptByIncharge());
  };

  const rejectScholarship = () => {
    dispatch(scholarshipRejectByIncharge());
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="content">
            <div className="approvBox"> 
                <div className="entry">
                    <label  className="label_name">Enrollment Number</label> 
                  <p>{data.enrollmentNumber}</p>
                </div>
                <div className="entry">
                    <label  className="label_name">Name</label> 
                  <p>{data.name}</p>
                </div>
                <div className="entry">
                    <label  className="label_name">semester</label> 
                  <p>{data.semester}</p>
                </div>
                <div className="entry">
                    <label  className="label_name">Department</label> 
                  <p>{data.department}</p>
                </div>
                <div className="entry">
                    <label  className="label_name">Scholarship</label> 
                  <p>{data.scholarship}</p>
                </div>
                <div className="entry">
                    <label  className="label_name">Session</label> 
                  <p>{data.session}</p>
                </div>
                <div className="entry">
                    <label  className="label_name">State</label> 
                  <p>{data.state}</p>
                </div>
                {data.scholarshipDocument && (
                  <div className="entry">
                    <label  className="label_name">Scholarship</label> 
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={data.scholarshipDocument.url}>
                      View
                    </a>
                  </div>
                )}
                {!data.scholarshipDocument && (
                  <div className="entry">
                  <label  className="label_name">Scholarship</label> 
                    <p> Scholarship Document not uploaded</p>
                  </div>
                )}
                <br></br>
                <br></br>
                <div className="btn">
                  <button className="signInbtn border hover" onClick={rejectScholarship}>Reject</button>
                  <button className="signInbtn border hover" onClick={acceptScholarship}>Accept</button>
                </div>
                </div>
           
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ScholarshipApprovalMapping;
