import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LiveCard from '../../../Components/Cards/TutorCard/LiveCard';
import { tutorInstance } from '../../Utils/axios';

function Shedules() {
  const [userLiveClasses, setUserLiveClasses] = useState([]);

  const fetchUserLiveClasses = async () => {
    try {
      const response = await tutorInstance.get('/lives-shedules/', {
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
    <div style={{ height: '100vh', backgroundColor: '#fcdad1' }}>
      <div className="container" style={{ paddingTop: '7rem' }}>
        <div className="row">
          <div className="col">
            <div className="header d-flex justify-content-between align-items-center">
              <div>
                <Link to="/live" style={{ textDecoration: 'none' }}>
                  Shedules
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Row */}
        <div className="row mt-3">
          <div className="container grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {userLiveClasses.map((liveClass) => (
              <LiveCard key={liveClass.id} liveClass={liveClass} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shedules;
