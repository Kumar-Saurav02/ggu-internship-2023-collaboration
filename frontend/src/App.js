import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/RegisterLogin/Register";
import Login from "./components/RegisterLogin/Login";
import StudentScholarship from "./components/Student/StudentScholarship/StudentScholarship";
import CourseSelection from "./components/Student/CourseSelection/CourseSelection";
import { useEffect } from "react";
import { loadStudent } from "./actions/studentAction";
import { loadTeacher } from "./actions/teacherAction";
import store from "./Store";
import StudentsApproval from "./components/Admin/Student/StudentsApproval";
import StudentApprovalDetails from "./components/Admin/Student/StudentApprovalDetails";
import TeacherApprovalDetails from "./components/Admin/Teacher/TeacherApprovalDetails";
import TeachersApproval from "./components/Admin/Teacher/TeachersApproval";
import Header from "./components/Layout/Header/Header";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import ProfileStudent from "./components/Student/Profile/ProfileStudent";
import DocumentUploadStudent from "./components/Student/DocumentUploadStudent/DocumentUploadStudent";
import ProfileTeacher from "./components/Teacher/Profile/ProfileTeacher";
import HODApproval from "./components/Admin/HOD/HODApproval";
import CreateSubject from "./components/Teacher/HOD/CreateSubject/CreateSubject";
import CreateCourse from "./components/Teacher/HOD/CreateCourse/CreateCourse";
import ChangingTeacherRole from "./components/Admin/Roles/ChangingTeacherRole";
import CourseApproval from "./components/Teacher/ClassIncharge/CourseApproval/CourseApproval";
import ScholarshipApproval from "./components/Teacher/ClassIncharge/ScholarshipApproval/ScholarshipApproval";

function App() {
  useEffect(() => {
    store.dispatch(loadStudent());
    store.dispatch(loadTeacher());
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/studentsApproval" element={<StudentsApproval />} />
        <Route
          path="/studentApprovalDetails"
          element={<StudentApprovalDetails />}
        />
        <Route path="/teachersApproval" element={<TeachersApproval />} />
        <Route
          path="/teacherApprovalDetails"
          element={<TeacherApprovalDetails />}
        />
        <Route path="/HODApproval" element={<HODApproval />} />
        <Route path="/updateTeacherRole" element={<ChangingTeacherRole />} />

        {/* Student */}
        <Route path="/studentProfile" element={<ProfileStudent />} />
        <Route
          path="/studentDocumentUpload"
          element={<DocumentUploadStudent />}
        />
        <Route path="/studentCourseSelection" element={<CourseSelection />} />
        <Route path="/studentScholarship" element={<StudentScholarship />} />

        {/* Teacher */}
        <Route path="/teacherProfile" element={<ProfileTeacher />} />

        {/* HOD */}
        <Route path="/hod/createSubject" element={<CreateSubject />} />
        <Route path="/hod/createCourse" element={<CreateCourse />} />

        {/* Class Incharge */}
        <Route
          path="/classIncharge/courseApproval"
          element={<CourseApproval />}
        />
        <Route
          path="/classIncharge/scholarshipApproval"
          element={<ScholarshipApproval />}
        />
      </Routes>
    </Router>
  );
}

export default App;
