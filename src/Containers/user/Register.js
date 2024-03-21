import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from '../../Containers/Utils/axios'; // Adjust the path accordingly
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Containers/user/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const [validationErrors, setValidationErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (mobileNumber) => {
    const mobileRegex = /^\d{10}$/; // Match exactly 10 digits
    return mobileRegex.test(mobileNumber);
  };
  

  const validatePassword = (password) => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;

    const isLowerCaseValid = lowercaseRegex.test(password);
    const isUpperCaseValid = uppercaseRegex.test(password);
    const isNumberValid = numberRegex.test(password);

    return {
      isLowerCaseValid,
      isUpperCaseValid,
      isNumberValid,
      isLengthValid: password.length >= 6,
    };
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    
  let newValue = value.trim(); // Remove leading and trailing whitespace

  if (name === 'mobileNumber' && newValue.length <= 10) {
    newValue = '+91-' + newValue; // Add '+91-' prefix
  }

    setFormData({
      ...formData,
      [name]: value,
    });

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    switch (name) {
      case 'email':
        if (!validateEmail(value)) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Invalid email format',
          }));
        }
        break;
      case 'mobileNumber':
        if (value && !validateMobileNumber(value)) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            mobileNumber: 'Invalid mobile number format',
          }));
        }
        break;
      case 'password':
        const passwordValidation = validatePassword(value);
        if (!passwordValidation.isLowerCaseValid) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            password: 'Password must contain at least one lowercase letter',
          }));
        } else if (!passwordValidation.isUpperCaseValid) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            password: 'Password must contain at least one uppercase letter',
          }));
        } else if (!passwordValidation.isNumberValid) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            password: 'Password must contain at least one number',
          }));
        } else if (!passwordValidation.isLengthValid) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            password: 'Password must be at least 6 characters long',
          }));
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: 'Passwords do not match',
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.mobileNumber && !validateMobileNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number format';
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isLowerCaseValid) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!passwordValidation.isUpperCaseValid) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!passwordValidation.isNumberValid) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!passwordValidation.isLengthValid) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      Object.values(newErrors).forEach((error) => showToast(error));
      return;
    }
    const formattedPhoneNumber = formData.mobileNumber.startsWith('+91-')
  ? formData.mobileNumber // If mobileNumber already starts with '+91-', use it as is
  : '+91-' + formData.mobileNumber; // Otherwise, add '+91-' prefix


    try {
      // Make a POST request to your backend registration endpoint using the Axios instance
      const response = await axios.post('/api/user/register/', {
        email: formData.email,
        phone_number: formattedPhoneNumber,
        password: formData.password,
        password2: formData.confirmPassword,
      });

      // Assuming your backend returns some data upon successful registration
      const data = response.data;

      // Handle the registration response
      if (response.status === 201) {
        // Registration successful
        console.log('Registration successful:', data);
        navigate("/login");
        showToast('Registration successful', 'success');
      } else {
        // Registration failed
        console.error('Registration failed:', data);
        showToast('Registration failed: ' + data.error);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Registration failed:', error.message);
      showToast('Registration failed: ' + error.message);
    }
  };

  return (
    <div>
    <div className='signup template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: 'rgb(157, 85, 234)' }}>
        <div className='form_container p-5 rounded 'style={{backgroundColor:'#6a379a7d'}}>
          <form onSubmit={handleSubmit}>
            <h3 className='text-center'>Sign Up</h3>
            <div className='mb-3'>
              <input type="email" name="email" placeholder='Enter Email' className='form-control' onChange={handleInputChange} />
              {validationErrors.email && <p className="error-message">{validationErrors.email}</p>}
            </div>
            <div className='mb-3'>
              <input type="text" name="mobileNumber" placeholder='Enter phone number' className='form-control' onChange={handleInputChange} />
              {validationErrors.mobileNumber && <p className="error-message">{validationErrors.mobileNumber}</p>}
            </div>
            <div className='mb-3'>
              <input type="password" name="password" placeholder='Enter password' className='form-control' onChange={handleInputChange} />
              {validationErrors.password && <p className="error-message">{validationErrors.password}</p>}
            </div>
            <div className='mb-3'>
              <input type="password" name="confirmPassword" placeholder='Confirm Password' className='form-control' onChange={handleInputChange} />
              {validationErrors.confirmPassword && <p className="error-message">{validationErrors.confirmPassword}</p>}
            </div>
            <div className='mb-2'>
              <input type='checkbox' className='custom-control custom-checkbox' id='check' />
              <label htmlFor='check' className='custom-input-label ms-2'>
                Remember me
              </label>
            </div>            <div className='d-grid mt-2'>
              <button type="submit" className='btn btn-primary mb-3'>Sign Up</button>
            </div>
            <p className='text-end mt-2'>
              <Link to='/login' className='ms-2'>Sign In</Link>
            </p>
            
          </form>
        </div>
      </div>

    </div>
  );
}

export default Register;
