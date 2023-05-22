import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/RegisterLogin/Register";
import Login from "./components/RegisterLogin/Login";
import Scholarship from "./components/studentScholarship/StudentScholarship";
import CourseSelection from "./components/CourseSelection/CourseSelection";
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
        <Route path="/scholarship" element={<Scholarship />} />
        <Route path="/courseSelection" element={<CourseSelection />} />
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
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
