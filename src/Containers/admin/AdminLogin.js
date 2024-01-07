// In your AdminLogin.js
import '../user/Login.css';
import 'react-toastify/dist/ReactToastify.css';

import {Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setAdminCredentials } from '../../Redux/slices/adminSlice/adminAuthSlice';
import { toast, ToastContainer } from 'react-toastify';
import instance from '../../Containers/Utils/axios';
import jwt_decode from 'jwt-decode';



function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors,setFormErrors]=useState({})
 const [isSubmit,setIsSubmit]=useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

 const {adminInfo}=useSelector((state)=>state.adminAuth)


  useEffect(() => {
    const shouldNavigate = adminInfo && adminInfo.role === 'admin';

    if (shouldNavigate) {
      navigate("/admin/dashboard");
    }
  }, [navigate, adminInfo]);

  useEffect(()=>{
    if(Object.keys(formErrors).length==0&&isSubmit){
        console.log()
    }
  },[formErrors])


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
  

  const submitHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validate(email, password));
    setIsSubmit(true);
  
    try {
      const res = await instance.post(`/api/token/`, { email, password });
  
      // Check for successful response status
      if (res.status === 200) {
        try {
          // Decoding access token
          const decodedAccessToken = jwt_decode(res.data.access);
          console.log("Decoded Access Token:", decodedAccessToken);
  
          const { role } = decodedAccessToken;
  
          // Check if the role is "admin" before navigating
          if (role === "admin") {
            dispatch(setAdminCredentials({ user_id: decodedAccessToken.user_id, role, ...res.data }));
            showToast('success fully logined','success');
            navigate('/admin/dashboard');
          } else {
            showToast("Invalid role", 'error');
          }
        } catch (decodeError) {
          console.error("Error decoding token:", decodeError.message);
          showToast("Error decoding token", 'error');
        }
      } else {
        // Handle non-200 status (e.g., server error)
        console.error("Server error:", res.status);
        showToast("Server error", 'error');
      }
    } catch (error) {
      console.error("API request error:", error);
      showToast(error?.response?.data || error.error || "Error in API request", 'error');
    }
  };
  
  

  const validate=(email,password)=>{

    const errors={}
    const regex= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if(!email)  {
       errors.email='Email is required'
      }else if(!regex.test(email)){
        errors.email='This is an invalid email'
      }
      if(!password){
        errors.password='Password is required'
      }else if(password.length<3){
        errors.password='Password must be more than or equal to 3 characters'
      }else if(password.length>10){
        errors.password='Password must be less than or equal to 10 characters'
      }
      return errors
  }
  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 'style={{ backgroundColor: 'rgb(157, 85, 234)' }}>
    <div className='form_container  p-5 rounded'style={{backgroundColor:'#6a379a7d'}}>
      <form onSubmit={submitHandler}>
        <h3 className='text-center'>Admin Login</h3>
        <div className='mb-3'>
          <input type="email" placeholder='Enter Email'  onChange={(e) => {
                setEmail(e.target.value);
              }} className='form-control' />
          <p style={{color:'red'}}>{formErrors.email}</p>
        </div>
        <div className='mb-3'>
          <input type="password" placeholder='Enter password'  onChange={(e) => {
                setPassword(e.target.value);
              }} className='form-control' />
          <p style={{color:'red'}}>{formErrors.password}</p>
        </div>
        <div className='d-grid'>
          <button className='btn mb-3 bg-info'>Sign In</button>
        </div>
      </form>
      {/* <p className='text-end mt-2'>
      <Link style={{color:"black",textDecoration:'none'}} to='/admin/forgotPassword'>Forgot Password</Link> | 
      <Link style={{color:"black",textDecoration:'none'}} to='/admin/otpLoginEmail' className="ms-2">Otp Login</Link>
      </p> */}
    </div>

  </div>
  )
}

export default AdminLogin