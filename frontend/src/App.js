import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/RegisterLogin/Register";
import Login from "./components/RegisterLogin/Login";
import Scholarship from "./components/studentScholarship/StudentScholarship";
import CourseSelection from "./components/CourseSelection/CourseSelection";
import SDocumentUpload from "./components/StudentDocumentUpload/DocumentUpload"
import { useEffect } from "react";
import { loadStudent } from "./actions/studentAction";
import { loadTeacher } from "./actions/teacherAction";
import store from "./Store";

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
        <Route path="/scholarship" element={<Scholarship />} />
        <Route path="/courseSelection" element={<CourseSelection />} />
        <Route path="/documents" element={ <SDocumentUpload/> }></Route>
      </Routes>
    </Router>
  );
}

export default App;
