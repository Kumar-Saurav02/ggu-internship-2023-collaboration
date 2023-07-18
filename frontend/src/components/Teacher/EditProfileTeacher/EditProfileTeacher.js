import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import SidebarTeacher from "../SidebarTeacher/SidebarTeacher";
import "./EditProfileTeacher.css";
import { updateTeacherDetails } from "../../../actions/teacherAction";
import { clearMessages } from "../../../actions/adminAction";

const EditProfileTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacher, loading } = useSelector(
    (state) => state.registerLoginTeachers
  );

  const {
    loading: updateLoading,
    message,
    error,
  } = useSelector((state) => state.updateTeacherDetails);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessages());
      window.location.reload(true);
    }
  }, [error, message]);

  const [teacherMobileNumber, setTeacherMobileNumber] = useState(
    teacher.mobileNumber
  );
  const [profilePhoto, setProfilePhoto] = useState(teacher.profilePhoto.url);
  const [signature, setSignature] = useState(teacher.signature.url);
  const [resume, setResume] = useState(teacher.resume.url);
  const [resumePreviewTeacher, setResumePreviewTeacher] = useState();

  const photoUpdate = (e) => {
    if (e.target.name === "photoUploadTeacher") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfilePhoto(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "signatureUploadTeacher") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setSignature(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "resumeUploadTeacher") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setResume(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setResumePreviewTeacher(e.target.value);
    }
  };

  const updateTeacherProfile = () => {
    if (teacherMobileNumber.toString().length !== 10) {
      return toast.error("Mobile Number should be of length 10");
    }

    if (
      profilePhoto.length > 1000 &&
      signature.length > 1000 &&
      resume.length > 1000
    ) {
      dispatch(
        updateTeacherDetails(
          teacherMobileNumber,
          profilePhoto,
          signature,
          resume
        )
      );
    } else if (
      profilePhoto.length > 1000 &&
      signature.length > 1000 &&
      resume.length < 1000
    ) {
      dispatch(
        updateTeacherDetails(
          teacherMobileNumber,
          profilePhoto,
          signature,
          undefined
        )
      );
    } else if (
      profilePhoto.length > 1000 &&
      signature.length < 1000 &&
      resume.length > 1000
    ) {
      dispatch(
        updateTeacherDetails(
          teacherMobileNumber,
          profilePhoto,
          undefined,
          resume
        )
      );
    } else if (
      profilePhoto.length < 1000 &&
      signature.length > 1000 &&
      resume.length > 1000
    ) {
      dispatch(
        updateTeacherDetails(teacherMobileNumber, undefined, signature, resume)
      );
    } else if (
      profilePhoto.length < 1000 &&
      signature.length < 1000 &&
      resume.length > 1000
    ) {
      dispatch(
        updateTeacherDetails(teacherMobileNumber, undefined, undefined, resume)
      );
    } else if (
      profilePhoto.length < 1000 &&
      signature.length > 1000 &&
      resume.length < 1000
    ) {
      dispatch(
        updateTeacherDetails(
          teacherMobileNumber,
          undefined,
          signature,
          undefined
        )
      );
    } else if (
      profilePhoto.length > 1000 &&
      signature.length < 1000 &&
      resume.length < 1000
    ) {
      dispatch(
        updateTeacherDetails(
          teacherMobileNumber,
          profilePhoto,
          undefined,
          undefined
        )
      );
    } else if (
      profilePhoto.length < 1000 &&
      signature.length < 1000 &&
      resume.length < 1000
    ) {
      dispatch(
        updateTeacherDetails(
          teacherMobileNumber,
          undefined,
          undefined,
          undefined
        )
      );
    }
  };

  return (
    <Fragment>
      {loading || updateLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="editProfileTeacher">
            <SidebarTeacher role={teacher.subRole} />
            <div>
              <div>
                <h2> Edit ProfileTeacher</h2>
              </div>
              <div>
                <div>
                  <p>Mobile Number</p>
                  <input
                    type="number"
                    placeholder="Teacher's Mobile Number"
                    required
                    value={teacherMobileNumber}
                    onChange={(e) => setTeacherMobileNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label>Profile Photo</label>
                  <img src={profilePhoto} />
                  <input
                    type="file"
                    name="photoUploadTeacher"
                    value=""
                    accept="image/*"
                    onChange={photoUpdate}
                  />
                </div>
                <div>
                  <label>Signature</label>
                  <img src={signature} />
                  <input
                    type="file"
                    name="signatureUploadTeacher"
                    value=""
                    accept="image/*"
                    onChange={photoUpdate}
                  />
                </div>
                <div>
                  <label for="myFile">Upload new resume:</label>
                  <input
                    type="file"
                    required
                    name="resumeUploadTeacher"
                    value=""
                    accept="pdf/*"
                    id="myFile"
                    onChange={photoUpdate}
                  />
                  <p>Uploaded Resume:- {resumePreviewTeacher}</p>
                </div>
                <button onClick={updateTeacherProfile}>Update</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default EditProfileTeacher;
