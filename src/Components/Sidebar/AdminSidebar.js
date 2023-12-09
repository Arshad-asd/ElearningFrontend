// AdminSidebar.js
import React, { useState } from "react";
import "../../Components/Sidebar/AdminSidebar.css";
import AdminHeader from "../../Components/Header/AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../Redux/slices/adminSlice/adminAuthSlice";
import { adminInstance } from "../../Containers/Utils/axios";
import {
  FaHome,
  FaUser,
  FaChalkboardTeacher,
  FaBook,
  FaMoneyBillAlt,
  FaChartBar,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { TbCategory } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminSidebar() {
  const [isIconsOnly, setIsIconsOnly] = useState(false);
  const [showSubCategories, setShowSubCategories] = useState(false);

  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
  };

  const toggleSubCategories = () => {
    setShowSubCategories(!showSubCategories);
  };

  const { adminInfo } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(adminLogout());
      showToast("Logout successfully", "success");
      navigate("/admin");
    } catch (error) {
      console.error("Logout failed", error);
      showToast("Logout failed", "error");
    }
  };

  const showToast = (message, type = "error") => {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <AdminHeader />
      {adminInfo && adminInfo.role === "admin" && (
        <aside className={`admin-sidebar ${isIconsOnly ? "icons-only" : ""}`}>
          <div className="toggle-button" onClick={toggleIconsOnly}>
            {isIconsOnly ? "☰" : "✖"}
          </div>
          <ul>
            <NavLink
              to="/admin/dashboard"
              className="active-link"
              style={{ textDecoration: "none", color: "black" }}
            >
              <li>
                <FaHome className="sidebar-icon" />
                <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                  Dashboard
                </span>
              </li>
            </NavLink>
            <NavLink
              to="/admin/usermanagement"
              className="active-link"
              style={{ textDecoration: "none", color: "black" }}
            >
              <li>
                <FaUser className={`sidebar-icon ${isIconsOnly ? "" : ""}`} />
                <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                  User Management
                </span>
              </li>
            </NavLink>
            <NavLink
              to="/admin/tutormanagemet"
              className="active-link"
              style={{ textDecoration: "none", color: "black" }}
            >
              <li>
                <FaChalkboardTeacher
                  className={`sidebar-icon ${isIconsOnly ? "" : ""}`}
                />
                <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                  Tutor Management
                </span>
              </li>
            </NavLink>
            <NavLink
              to="/admin/plan-management"
              className="active-link"
              style={{ textDecoration: "none", color: "black" }}
            >
              <li>
                <HiOutlineCurrencyRupee
                  className={`sidebar-icon ${isIconsOnly ? "" : ""}`}
                />
                <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                  Plans
                </span>
              </li>
            </NavLink>
            <NavLink
              to="/admin/category-management"
              className="active-link"
              style={{ textDecoration: "none", color: "black" }}
            >
              <li onClick={toggleSubCategories}>
                <TbCategory
                  className={`sidebar-icon ${isIconsOnly ? "" : ""}`}
                />
                <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                  Category
                </span>
              </li>
            </NavLink>
            {showSubCategories && (
              <ul className="sub-categories">
                <li style={{ marginLeft: "50px" }}>
                  <NavLink
                    to="/admin/subcategory"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <span
                      className={`menu-text ${isIconsOnly ? "hidden" : ""}`}
                    >
                      SubCategory
                    </span>
                  </NavLink>
                </li>
              </ul>
            )}
            <NavLink
              to="/admin/coursemanagement/"
              style={{ textDecoration: "none", color: "black" }}
            >
              <li>
                <FaBook className={`sidebar-icon ${isIconsOnly ? "" : ""}`} />
                <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                  Courses
                </span>
              </li>
            </NavLink>
            <NavLink
              to="/admin/subscription"
              style={{ textDecoration: "none", color: "black" }}
            >
              <li>
                <FaMoneyBillAlt
                  className={`sidebar-icon ${isIconsOnly ? "" : ""}`}
                />
                <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                  Subscription
                </span>
              </li>
            </NavLink>
            {/* New li tags with corresponding icons */}
            {/* <li>
              <FaChartBar className={`sidebar-icon ${isIconsOnly ? "" : ""}`} />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Sales Report
              </span>
            </li>
            <li>
              <FaEnvelope className={`sidebar-icon ${isIconsOnly ? "" : ""}`} />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Messages
              </span>
            </li> */}
            <li className="logout-button" onClick={handleLogout}>
              <FaSignOutAlt className="sidebar-icon" />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Logout
              </span>
            </li>
          </ul>
        </aside>
      )}
    </>
  );
}

export default AdminSidebar;
