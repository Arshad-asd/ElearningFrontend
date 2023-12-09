import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import img from "../../assets/ElearningLogo.svg";
import { MdOutlineLogout } from "react-icons/md";
import { logout } from "../../Redux/slices/userSlice/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentActive, setCurrentActive] = useState(null);
  const dispatch = useDispatch();
  const showToast = (message, type = "error") => {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleMobileMenuClick = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };
  const { userInfo } = useSelector((state) => state.auth);

  const handleClick = (index) => {
    setCurrentActive(index);
  };

  const handleLogout = () => {
    dispatch(logout());
    showToast("logout sucessfully", "success");
  };
  const navLinks = [
    { id: 1, text: "Home", path: "/" },
    { id: 4, text: "Lives", path: "/lives" },
    { id: 3, text: "Courses", path: "/courses" },
    { id: 2, text: "Plans", path: "/plans" },
  ];

  return (
    <>
      <nav>
        <Link to="/">
          <img src={img} alt="Logo" />
        </Link>
        <div>
          <ul id="navbar" className={mobileMenuOpen ? "active" : ""}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.path}
                  className={link.id === currentActive ? "active-link" : ""}
                  onClick={() => {
                    handleClick(link.id);
                    if (window.innerWidth <= 769) {
                      handleMobileMenuClick();
                    }
                  }}
                >
                  {link.text}
                </Link>
              </li>
            ))}
            {/* Add a profile icon here */}
            <li>
              <Link to="/profile" className="profile-icon">
                <i className="fas fa-user"></i>
              </Link>
            </li>
            {userInfo ? (
              // If user is logged in, show the Logout button
              <li>
                <button
                  className="logout-buttons rounded-lg"
                  onClick={handleLogout}
                >
                  <MdOutlineLogout className="ml-2" />
                </button>
              </li>
            ) : (
              // If user is not logged in, show the Login button
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        <div id="mobile" onClick={handleMobileMenuClick}>
          <i
            id="bar"
            className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
