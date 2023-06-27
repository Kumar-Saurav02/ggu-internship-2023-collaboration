import React, { useState } from "react";
import "./SidebarStudent.css";
import { Link, useNavigate } from "react-router-dom";
import { logoutStudent } from "../../../actions/studentAction";
import PeopleIcon from "@mui/icons-material/People";
import { useDispatch } from "react-redux";
import MenuIcon from '@mui/icons-material/Menu';
import {motion} from 'framer-motion';

const SidebarStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutStudent());
    navigate("/");
  };
  const [expanded, setExpaned] = useState(false)
  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-65%'
    }
  }
  return (
    <>
    <div className="bars" style={expanded?{left: '49%'}:{left: '2%'}} onClick={()=>setExpaned(!expanded)}>
        <MenuIcon />
      </div>
    <motion.div className="sidebarss" 
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      <Link to="/studentProfile">
        <p>
          <PeopleIcon />
          Profile
        </p>
      </Link>
      <Link to="/studentDocumentUpload">
        <p>
          <PeopleIcon />
          Documents Upload
        </p>
      </Link>
      <Link to="/studentCourseSelection">
        <p>
          <PeopleIcon />
          Course Selection
        </p>
      </Link>
      <Link to="/studentScholarship">
        <p>
          <PeopleIcon />
          Scholarship
        </p>
      </Link>
      <br></br>
      <br></br>
      <br></br>
      <button className="signInbtn border hover "
        onClick={logout}>Logout</button>
    </motion.div>
    </>
  );
};

export default SidebarStudent;
