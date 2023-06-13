import React, { Fragment, useEffect, useState } from "react";
import SidebarStudent from "../SidebarStudent/SidebarStudent";
import "./DocumentUploadStudent.css";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import { uploadingFees, uploadingMarks } from "../../../actions/studentAction";
import { clearMessages } from "../../../actions/adminAction";

const DocumentUploadStudent = () => {
  const dispatch = useDispatch();
  const { student, loading } = useSelector(
    (state) => state.registerLoginStudents
  );

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

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const [feeDetails, setFeeDetails] = useState({
    semesterForFees: "",
    bankNameForFees: "",
    accountNumberForFees: "",
    ifscCodeForFees: "",
    amountForFees: "",
    challanIdForFees: "",
    feeUploadDocument: "",
  });
  const {
    semesterForFees,
    bankNameForFees,
    accountNumberForFees,
    ifscCodeForFees,
    amountForFees,
    challanIdForFees,
    feeUploadDocument,
  } = feeDetails;

  const [dateOfPaymentForFees, setDateOfPaymentForFees] = useState();
  const [feeUpload, setFeeUpload] = useState();
  const [previewFeeUpload, setPreviewFeeUpload] = useState("");

  const registerFeeDataChange = (e) => {
    if (e.target.name === "feeUploadDocument") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFeeUpload(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setPreviewFeeUpload(e.target.value);
    } else {
      setFeeDetails({ ...feeDetails, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (student !== undefined && student.feeDetails !== undefined) {
      for (let i = 0; i < student.feeDetails.length; i++) {
        if (student.feeDetails[i].semester === semesterForFees) {
          toast.error("Fee details are uploaded for current semester");
        }
      }
    }
  }, [semesterForFees]);

  const [resultDetails, setResultDetails] = useState({
    semesterForResult: "",
    cgpaForResult: "",
    sgpaForResult: "",
    resultUploadForResult: "",
  });
  const {
    semesterForResult,
    cgpaForResult,
    sgpaForResult,
    resultUploadForResult,
  } = resultDetails;

  const [resultUpload, setResultUpload] = useState();
  const [previewResultUpload, setPreviewResultUpload] = useState("");

  const registerResultDataChange = (e) => {
    if (e.target.name === "resultUploadForResult") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setResultUpload(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setPreviewResultUpload(e.target.value);
    } else {
      setResultDetails({ ...resultDetails, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (student !== undefined && student.feeDetails !== undefined) {
      for (let i = 0; i < student.marksDetails.length; i++) {
        if (student.marksDetails[i].semester === semesterForResult) {
          toast.error("Result details are uploaded for current semester");
        }
      }
    }
  }, [semesterForResult]);

  const submitFeeDataChange = () => {
    if (semesterForFees.trim() === "") {
      return toast.error("Fill semester properly");
    }
    if (bankNameForFees.trim() === "") {
      return toast.error("Fill Bank Name properly");
    }
    if (accountNumberForFees.trim() === "") {
      return toast.error("Fill account number properly");
    }
    if (ifscCodeForFees.trim() === "") {
      return toast.error("Fill IFSC Code properly");
    }
    if (amountForFees.trim() === "") {
      return toast.error("Fill amount properly");
    }
    if (challanIdForFees.trim() === "") {
      return toast.error("Fill challan ID properly");
    }
    if (feeUpload.trim() === "") {
      return toast.error("Upload document properly");
    }
    const updatingDateOfPayment = dateOfPaymentForFees.$d.toString().split(" ");
    const updatedDateOfPayment =
      updatingDateOfPayment[1] +
      " " +
      updatingDateOfPayment[2] +
      " " +
      updatingDateOfPayment[3];
    dispatch(
      uploadingFees(
        semesterForFees.trim(),
        bankNameForFees.trim(),
        accountNumberForFees.trim(),
        ifscCodeForFees.trim(),
        amountForFees.trim(),
        challanIdForFees.trim(),
        updatedDateOfPayment,
        feeUpload
      )
    );
  };

  const submitMarksDataChange = () => {
    if (semesterForResult.trim() === "") {
      return toast.error("Fill semester properly");
    }
    if (
      sgpaForResult.trim() === "" ||
      (sgpaForResult.trim() <= "10" && sgpaForResult.trim() >= "0")
    ) {
      return toast.error("Value should be between 0 and 10");
    }
    if (
      cgpaForResult.trim() === "" ||
      (cgpaForResult.trim() <= "10" && cgpaForResult.trim() >= "0")
    ) {
      return toast.error("Value should be between 0 and 10");
    }
    if (resultUpload.trim() === "") {
      return toast.error("Upload document properly");
    }
    dispatch(
      uploadingMarks(
        semesterForResult.trim(),
        sgpaForResult.trim(),
        cgpaForResult.trim(),
        resultUpload
      )
    );
  };

  return (
    <Fragment>
      {loading || uploading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="documentUploadStudent">
            <SidebarStudent />
            <div>
              <div>
                <h3>Fees Upload</h3>
                <div>
                  <div>
                    <label>Semester</label>
                    <select
                      required
                      name="semesterForFees"
                      onChange={registerFeeDataChange}>
                      <option value={semesterForFees}>Semester</option>
                      {semesters.map((sem) => (
                        <option key={sem} value={sem}>
                          {sem}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Bank Name</label>
                    <input
                      type="text"
                      placeholder="Bank Name"
                      required
                      name="bankNameForFees"
                      value={bankNameForFees}
                      onChange={registerFeeDataChange}
                    />
                  </div>
                  <div>
                    <label>IFSC Code</label>
                    <input
                      type="text"
                      placeholder="IFSC Code"
                      required
                      name="ifscCodeForFees"
                      value={ifscCodeForFees}
                      onChange={registerFeeDataChange}
                    />
                  </div>
                  <div>
                    <label>Amount</label>
                    <input
                      type="number"
                      placeholder="Amount"
                      required
                      name="amountForFees"
                      value={amountForFees}
                      onChange={registerFeeDataChange}
                    />
                  </div>
                  <div>
                    <label>Challan ID</label>
                    <input
                      type="text"
                      placeholder="Challan ID"
                      required
                      name="challanIdForFees"
                      value={challanIdForFees}
                      onChange={registerFeeDataChange}
                    />
                  </div>
                  <div>
                    <label>Account Number</label>
                    <input
                      type="number"
                      placeholder="Account Number"
                      required
                      name="accountNumberForFees"
                      value={accountNumberForFees}
                      onChange={registerFeeDataChange}
                    />
                  </div>
                  <div>
                    <label>Date of Payment</label>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date Of Payment"
                        value={dateOfPaymentForFees}
                        onChange={(newValue) =>
                          setDateOfPaymentForFees(newValue)
                        }
                      />
                    </LocalizationProvider>
                  </div>
                  <div>
                    <label>Fee Upload</label>
                    <input
                      type="file"
                      required
                      name="feeUploadDocument"
                      value={feeUploadDocument}
                      accept="pdf/*"
                      onChange={registerFeeDataChange}
                    />
                    <p>File:- {previewFeeUpload}</p>
                  </div>
                </div>
                <button onClick={submitFeeDataChange}>Submit</button>
              </div>
              <div>
                <h3>Result Upload</h3>
                <div>
                  <div>
                    <label>Semester</label>
                    <select
                      required
                      name="semesterForResult"
                      onChange={registerResultDataChange}>
                      <option value={semesterForResult}>Semester</option>
                      {semesters.map((sem) => (
                        <option key={sem} value={sem}>
                          {sem}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>CGPA</label>
                    <input
                      type="number"
                      placeholder="CGPA"
                      required
                      name="cgpaForResult"
                      value={cgpaForResult}
                      onChange={registerResultDataChange}
                    />
                  </div>
                  <div>
                    <label>SGPA</label>
                    <input
                      type="number"
                      placeholder="SGPA"
                      required
                      name="sgpaForResult"
                      value={sgpaForResult}
                      onChange={registerResultDataChange}
                    />
                  </div>
                  <div>
                    <label>Result Upload</label>
                    <input
                      type="file"
                      required
                      name="resultUploadForResult"
                      value={resultUploadForResult}
                      accept="pdf/*"
                      onChange={registerResultDataChange}
                    />
                    <p>File:- {previewResultUpload}</p>
                  </div>
                </div>
                <button onClick={submitMarksDataChange}>Submit</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default DocumentUploadStudent;
