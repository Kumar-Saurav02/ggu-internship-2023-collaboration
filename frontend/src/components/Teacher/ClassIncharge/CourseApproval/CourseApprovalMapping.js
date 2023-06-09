import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearMessages } from "../../../../actions/adminAction";
import {
  courseAcceptByIncharge,
  courseRejectByIncharge,
} from "../../../../actions/teacherAction";
import Loader from "../../../Loader/Loader";
import "./CourseApproval.css";

const CourseApprovalMapping = ({ data }) => {
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

  const acceptCourse = () => {
    dispatch(courseAcceptByIncharge());
  };

  const rejectCourse = () => {
    dispatch(courseRejectByIncharge(data._id));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
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
            <div className="showdata">
              <div className="Field_data_val">
                <span>
                  <h4>S. No</h4>
                </span>
                <span>
                  <h4>Subject Name</h4>
                </span>
                <span>
                  <h4>Subject Code</h4>
                </span>
                <span>
                  <h4>Credits</h4>
                </span>
                <span>
                  <h4>Category</h4>
                </span>
                <span>
                  <h4>Term</h4>
                </span>
              </div>
              {data.subjects &&
                data.subjects.map((subject, i) => {
                  return (
                    <div key={i} className="show_data_val">
                      <span>
                        <h4>{i + 1}</h4>
                      </span>
                      <span>
                        <h4> {subject.subjectName}</h4>
                      </span>
                      <span>
                        <h4> {subject.subjectCode}</h4>
                      </span>
                      <span>
                        <h4> {subject.subjectCredit}</h4>
                      </span>
                      <span>
                        <h4> {subject.category}</h4>
                      </span>
                      <span>
                        <h4> {subject.term} </h4>
                      </span>
                    </div>
                  );
                })}
            </div>
            <div>
              <button onClick={acceptCourse}>Accept</button>
              <button onClick={rejectCourse}>Reject</button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CourseApprovalMapping;
