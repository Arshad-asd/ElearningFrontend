import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../Redux/slices/userSlice/userApiSlice";
import { setCredentials } from "../../Redux/slices/userSlice/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth || {});

  const showToast = (message, type = 'error') => {
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
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (Object.keys(formErrors).length == 0) {
      console.log();
    }
  }, [formErrors]);
  const submitHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validate(email, password));

    try {
      const res = await login({ email, password }).unwrap();
      console.log("res", res);
      try {
        const decodedAccessToken = jwt_decode(res.access);
        console.log("Decoded Access Token:", decodedAccessToken);
      
        const { role, type } = decodedAccessToken;
        dispatch(setCredentials({ user_id: decodedAccessToken.user_id, role, type, ...res}));
        navigate("/");
        showToast("Success fully logined", 'success');

      } catch (decodeError) {
        console.error("Error decoding token:", decodeError.message);
        showToast("Error decoding token", 'error');
      }
      

    } catch (err) {
      showToast(err?.data || err?.error);
    }
  };

  const validate = (email, password) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      errors.email = "Email is required";
    } else if (!regex.test(email)) {
      errors.email = "This is an invalid email";
      showToast("This is an invalid email", 'error');

      
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Invalid Password";
    } else if (password.length > 10) {
      errors.password = "Invalid Password";
    }
    return errors;
  };
  return (
    <div
      className="login template d-flex justify-content-center align-items-center vh-100 "
      style={{ backgroundColor: 'rgb(157, 85, 234)' }}
    >
      <div className="form_container p-5 rounded "style={{backgroundColor:'#6a379a7d'}}>
        <form onSubmit={submitHandler}>
          <h3 className="text-center">Sign In</h3>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
            />
            {formErrors.email && (
              <p style={{ color: "red" }}>{formErrors.email}</p>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
            />
            <p style={{ color: "red" }}>{formErrors.password}</p>
          </div>

          <div className="d-grid mt-4">
            <button className="btn btn-primary mb-3">
              Sign In
            </button>
          </div>
          <div className="text-end mt-2">
            <p className="link">
              {/* <Link
                style={{ color: "black", textDecoration: "none" }}
                to="/forgotPassword"
              >
                Forgot Password ?
              </Link>{" "}
              | */}
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to="/signup"
                className="ms-2"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
        <div className="links-container text-end mt-2">
          {/* <p>
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to="/otpLoginEmail"
              className="ms-2"
            >
              Otp Login
            </Link>
          </p> */}
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
