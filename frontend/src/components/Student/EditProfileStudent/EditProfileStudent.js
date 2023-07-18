import React, { Fragment, useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import "./EditProfileStudent.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SidebarStudent from "../SidebarStudent/SidebarStudent";
import { toast } from "react-toastify";
import { updatingDataByStudent } from "../../../actions/studentAction";
import { clearMessages } from "../../../actions/adminAction";

const EditProfileStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { student, loading } = useSelector(
    (state) => state.registerLoginStudents
  );

  const {
    loading: uploading,
    message,
    error,
  } = useSelector((state) => state.marksFeesCourseUpdate);

  const yesNo = ["Yes", "No"];

  const [hosteler, setHosteler] = useState(student.hosteler);
  const [studentMobileNumber, setStudentMobileNumber] = useState(
    student.mobileNumber
  );
  const [fatherMobileNumber, setFatherMobileNumber] = useState(
    student.fatherMobileNumber
  );
  const [motherMobileNumber, setMotherMobileNumber] = useState(
    student.motherMobileNumber
  );

  const [profilePhoto, setProfilePhoto] = useState(student.photoUpload.url);
  const [signature, setSignature] = useState(student.signatureUpload.url);

  const photoUpdate = (e) => {
    if (e.target.name === "photoUploadStudent") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfilePhoto(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "signatureUploadStudent") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setSignature(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateStudentData = () => {
    if (
      studentMobileNumber.length !== 10 ||
      fatherMobileNumber.length !== 10 ||
      motherMobileNumber.length !== 10
    ) {
      return toast.error("Mobile Number should be of length 10");
    }

    if (profilePhoto.length > 1000 && signature.length > 1000) {
      dispatch(
        updatingDataByStudent(
          studentMobileNumber,
          fatherMobileNumber,
          motherMobileNumber,
          hosteler,
          profilePhoto,
          signature
        )
      );
    } else if (profilePhoto.length > 1000 && signature.length < 1000) {
      dispatch(
        updatingDataByStudent(
          studentMobileNumber,
          fatherMobileNumber,
          motherMobileNumber,
          hosteler,
          profilePhoto,
          undefined
        )
      );
    } else if (profilePhoto.length < 1000 && signature.length > 1000) {
      dispatch(
        updatingDataByStudent(
          studentMobileNumber,
          fatherMobileNumber,
          motherMobileNumber,
          hosteler,
          undefined,
          signature
        )
      );
    } else if (profilePhoto.length < 1000 && signature.length < 1000) {
      dispatch(
        updatingDataByStudent(
          studentMobileNumber,
          fatherMobileNumber,
          motherMobileNumber,
          hosteler,
          undefined,
          undefined
        )
      );
    }
  };

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

  return (
    <Fragment>
      {loading || uploading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="editProfileStudent">
            <SidebarStudent />
            <div>
              <div>
                <h2>Edit Profile</h2>
              </div>
              <div>
                <div>
                  <p>Student's Mobile Number</p>
                </div>
                <input
                  type="number"
                  placeholder="Students's Mobile Number"
                  required
                  value={studentMobileNumber}
                  onChange={(e) => setStudentMobileNumber(e.target.value)}
                />
              </div>
              <div>
                <div>
                  <p>Father's Mobile Number</p>
                </div>
                <input
                  type="number"
                  placeholder="Father's Mobile Number"
                  required
                  value={fatherMobileNumber}
                  onChange={(e) => setFatherMobileNumber(e.target.value)}
                />
              </div>
              <div>
                <div>
                  <p>Mother's Mobile Number</p>
                </div>
                <input
                  type="number"
                  placeholder="Mother's Mobile Number"
                  required
                  value={motherMobileNumber}
                  onChange={(e) => setMotherMobileNumber(e.target.value)}
                />
              </div>
              <div>
                <div>
                  <p>Hosteler</p>
                </div>
                <select
                  required
                  value={hosteler}
                  onChange={(e) => setHosteler(e.target.value)}>
                  {yesNo.map((yn) => (
                    <option key={yn} value={yn}>
                      {yn}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h2>Photographs</h2>
                <hr></hr>
                <br></br>

                <div>
                  <label>Photo</label>
                  <img src={profilePhoto} />
                  <input
                    type="file"
                    name="photoUploadStudent"
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
                    name="signatureUploadStudent"
                    value=""
                    accept="image/*"
                    onChange={photoUpdate}
                  />
                </div>
              </div>
              <div>
                <button onClick={updateStudentData}>Update</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default EditProfileStudent;
