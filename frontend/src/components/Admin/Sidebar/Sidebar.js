import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from '@mui/icons-material/Menu';
import {motion} from 'framer-motion';


const Sidebar = () => {

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
      <Link to="/studentsApproval">
        <p>
          <PeopleIcon />
          Students Approval
        </p>
      </Link>
      <Link to="/teachersApproval">
        <p>
          <PeopleIcon /> Teachers Approval
        </p>
      </Link>
      <Link to="/HODApproval">
        <p>
          <PeopleIcon />
          HOD Approval
        </p>
      </Link>
      <Link to="/updateTeacherRole">
        <p>
          <PeopleIcon />
          Teacher Role
        </p>
      </Link>
      </motion.div>
    </>
  );
};

export default Sidebar;
