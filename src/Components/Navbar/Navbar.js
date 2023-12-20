import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import img from "../../assets/ElearningLogo.svg";
import { MdOutlineLogout } from "react-icons/md";
import { logout, updateUserInfoType } from "../../Redux/slices/userSlice/authSlice";
import { toast } from "react-toastify";
import instance from "../../Containers/Utils/axios";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentActive, setCurrentActive] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    showToast("Logout successfully", "success");
  };
  useEffect(() => {
    if (userInfo) {
      const token = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).access
        : null;
      const checkAndUpdateSubscription = async () => {
        try {
          const response = await instance.get(
            "/api/user/subscription-detail/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const user = response.data;
          if (userInfo.type === "Premium") {
            console.log("prermium");
          } else if (user && user.expire_date) {
            console.log("poda /.........");
            const expireDate = new Date(user.expire_date);

            if (expireDate <= new Date()) {
              const updateResponse = await instance.patch(
                "/api/user/update-subscription-plan/",
                {
                  subscription_plan: null,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (updateResponse.status === 200) {
                const subscriptionType=null
                dispatch(updateUserInfoType(subscriptionType)); 
              } else {
                showToast("Failed to update subscription plan", "error");
              }
            }
          }
        } catch (error) {
          console.error("Error checking and updating subscription:", error);
          showToast("Error checking and updating subscription", "error");
        }
      };

      checkAndUpdateSubscription();
    }
  }, [dispatch, userInfo?.type, setCurrentActive]);

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
                  className={link.path === window.location.pathname ? "active-link" : ""}
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
            <li>
              <Link to="/profile" className="profile-icon">
                <i className="fas fa-user"></i>
              </Link>
            </li>
            {userInfo ? (
              <li>
                <button
                  className="logout-buttons rounded-lg"
                  onClick={handleLogout}
                >
                  <MdOutlineLogout className="ml-2" />
                </button>
              </li>
            ) : (
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
