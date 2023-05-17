import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/RegisterLogin/Register";
import Login from "./components/RegisterLogin/Login";
import SScholarship from "./components/studentScholarship/studentScholarship";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/sScholarship" element={<SScholarship/>}/>
      </Routes>
    </Router>
  );
}

export default App;
