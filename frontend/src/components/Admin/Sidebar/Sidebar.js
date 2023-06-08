import React from "react";
import "./Sidebar.css";
// import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CategoryIcon from "@mui/icons-material/Category";

const Sidebar = () => {
  return (
    <div className="sidebar">
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
    </div>
  );
};

export default Sidebar;
