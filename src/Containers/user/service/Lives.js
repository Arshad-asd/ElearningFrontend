import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import LiveCard from '../../../Components/Cards/UserCard/LiveCard'
import instance from '../../Utils/axios';

function Lives() {
  const [userLiveClasses, setUserLiveClasses] = useState([]);

  const fetchUserLiveClasses = async () => {
    try {
      const response = await instance.get('/api/user/lives-list/', {
      });

      // Update the state with the fetched live classes
      setUserLiveClasses(response.data);
    } catch (error) {
      // Handle errors
      handleApiError(error);
    }
  };

  useEffect(() => {
    // Fetch user's live classes when the component mounts
    fetchUserLiveClasses();
  }, []);

  const handleApiError = (error) => {
    console.error('Error:', error);

    let errorMessage = 'An error occurred. Please try again.';

    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        errorMessage = Object.values(error.response.data.errors)
          .map((errorText) => errorText)
          .join('<br>');
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    }

    showToast(errorMessage, 'error');
  };

  const showToast = (message, type = 'error') => {
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
    <div className=' w-full pt-4 bg-cyan-100' style={{height:'100vh',}}>
      <div className='container grid xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
      {userLiveClasses.map((liveClass) => (
              <LiveCard key={liveClass.id} liveClass={liveClass} />
            ))}
      </div>
    </div>
  )
}

export default Lives