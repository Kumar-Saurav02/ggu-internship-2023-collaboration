import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scholarshipApprovalByIncharge } from "../../../../actions/teacherAction";
import Loader from "../../../Loader/Loader";
import SidebarTeacher from "../../SidebarTeacher/SidebarTeacher";
import "./ScholarshipApproval.css";
import { toast } from "react-toastify";
import { clearMessages } from "../../../../actions/adminAction";
import ScholarshipApprovalMapping from "./ScholarshipApprovalMapping";

const ScholarshipApproval = () => {
  const dispatch = useDispatch();

  const {
    scholarships,
    loading: scholarshipLoading,
    error: scholarshipError,
  } = useSelector((state) => state.getScholarshipsForApproval);

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  console.log(scholarships);

  useEffect(() => {
    dispatch(scholarshipApprovalByIncharge());

    if (scholarshipError) {
      toast.error(scholarshipError);
      dispatch(clearMessages());
    }
  }, [dispatch, scholarshipError]);
  return (
    <Fragment>
      {scholarshipLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="scholarshipApproval">
            <SidebarTeacher role={teacher.subRole}/>
            <div className="approvBox">
              <div className="request">
              <h1>Mark's Entry</h1>
                <hr></hr>
                <br></br>
                {scholarships &&
                  scholarships.map((scholarship, i) => (
                    <div key={i}>
                      <ScholarshipApprovalMapping data={scholarship} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ScholarshipApproval;
