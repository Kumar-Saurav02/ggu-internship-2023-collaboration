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
import AttendanceEntry from "./components/Teacher/Attendance/AttendanceEntry";
import MarksEntry from "./components/Teacher/Marks/MarksEntry";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import EditProfileStudent from "./components/Student/EditProfileStudent/EditProfileStudent";
import EditProfileTeacher from "./components/Teacher/EditProfileTeacher/EditProfileTeacher";

function App() {
  useEffect(() => {
    store.dispatch(loadStudent());
    store.dispatch(loadTeacher());
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="admin"
              Component={Dashboard}
            />
          }
        />
        <Route
          path="/studentsApproval"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="admin"
              Component={StudentsApproval}
            />
          }
        />
        <Route
          path="/studentApprovalDetails"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="admin"
              Component={StudentApprovalDetails}
            />
          }
        />
        <Route
          path="/teachersApproval"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="admin"
              Component={TeachersApproval}
            />
          }
        />
        <Route
          path="/teacherApprovalDetails"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="admin"
              Component={TeacherApprovalDetails}
            />
          }
        />
        <Route
          path="/HODApproval"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="admin"
              Component={HODApproval}
            />
          }
        />
        <Route
          path="/updateTeacherRole"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="admin"
              Component={ChangingTeacherRole}
            />
          }
        />

        {/* Student */}
        <Route
          path="/studentProfile"
          element={
            <ProtectedRoute
              role="student"
              subRole=""
              Component={ProfileStudent}
            />
          }
        />
        <Route
          path="/editStudentProfile"
          element={
            <ProtectedRoute
              role="student"
              subRole=""
              Component={EditProfileStudent}
            />
          }
        />
        <Route
          path="/studentDocumentUpload"
          element={
            <ProtectedRoute
              role="student"
              subRole=""
              Component={DocumentUploadStudent}
            />
          }
        />
        <Route
          path="/studentCourseSelection"
          element={
            <ProtectedRoute
              role="student"
              subRole=""
              Component={CourseSelection}
            />
          }
        />
        <Route
          path="/studentScholarship"
          element={
            <ProtectedRoute
              role="student"
              subRole=""
              Component={StudentScholarship}
            />
          }
        />

        {/* Teacher */}
        <Route
          path="/teacherProfile"
          element={
            <ProtectedRoute
              role="teacher"
              subRole=""
              Component={ProfileTeacher}
            />
          }
        />
        <Route
          path="/editTeacherProfile"
          element={
            <ProtectedRoute
              role="teacher"
              subRole=""
              Component={EditProfileTeacher}
            />
          }
        />
        <Route
          path="/attendanceEntry"
          element={
            <ProtectedRoute
              role="teacher"
              subRole=""
              Component={AttendanceEntry}
            />
          }
        />
        <Route
          path="/marksEntry"
          element={
            <ProtectedRoute role="teacher" subRole="" Component={MarksEntry} />
          }
        />

        {/* HOD */}
        <Route
          path="/hod/createSubject"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="hod"
              Component={CreateSubject}
            />
          }
        />
        <Route
          path="/hod/createCourse"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="hod"
              Component={CreateCourse}
            />
          }
        />

        {/* Class Incharge */}
        <Route
          path="/classIncharge/courseApproval"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="classIncharge"
              Component={CourseApproval}
            />
          }
        />
        <Route
          path="/classIncharge/scholarshipApproval"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="classIncharge"
              Component={ScholarshipApproval}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
