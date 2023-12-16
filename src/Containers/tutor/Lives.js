// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import LiveCard from '../../Components/Cards/TutorCard/LiveCard';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AddLiveModal from './modal/AddLiveModal';
import EditLiveModal from './modal/EditLiveModal';  // Import the EditLiveModal
import { tutorInstance } from '../Utils/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Lives() {
  const [showModal, setShowModal] = useState(false);
  const [userLiveClasses, setUserLiveClasses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModalData, setEditModalData] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Function to handle adding a new live class
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddLive = async (newLiveData) => {
    try {
      const response = await tutorInstance.post('/create-live/', newLiveData);

      showToast('Live added', 'success');
      console.log('Live class added successfully:', response.data);

      fetchUserLiveClasses();
    } catch (error) {
      handleApiError(error);
    }
  };

  // Function to fetch user's live classes
  const fetchUserLiveClasses = async () => {
    try {
      const response = await tutorInstance.get('/lives-list/', {});

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

  // Function to handle API errors
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

  // Function to show toast notifications
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

  // Function to handle opening the edit modal
  const handleEditLive = (liveClass) => {
    setEditModalData(liveClass);
    setShowModal(true);  // Open the modal
  };

  // Function to handle editing the live class
  const handleEditLiveClass = async (editedLiveData) => {
    try {
      const response = await tutorInstance.put(`/live-class-update/${editedLiveData.id}/`, editedLiveData);

      showToast('Live updated', 'success');
      console.log('Live class updated successfully:', response.data);

      fetchUserLiveClasses();  // Fetch updated live classes
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#fcdad1' }}>
      <div className="container" style={{ paddingTop: '7rem' }}>
        <div className="row">
          <div className="col">
            <div className="header d-flex justify-content-between align-items-center">
              <div>
                <Link to="/live" style={{ textDecoration: 'none' }}>
                  Live
                </Link>
              </div>
              <Button variant="primary" onClick={handleOpenAddModal }>
                Add Live
              </Button>
            </div>
          </div>
        </div>

        {/* Cards Row */}
        <div className="row mt-3">
          <div className="container grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {userLiveClasses.map((liveClass) => (
              <LiveCard
                key={liveClass.id}
                liveClass={liveClass}
                onEdit={handleEditLive}
              />
            ))}
          </div>
        </div>
      </div>
      {/* AddLiveModal component */}
      <AddLiveModal
           isOpen={showAddModal}
        onRequestClose={handleCloseAddModal}
        onAddLive={handleAddLive}
        editModalData={editModalData}
      />

      {/* EditLiveModal component */}
      <EditLiveModal
        isOpen={showModal}  // Pass the same showModal state
        onRequestClose={handleCloseModal}
        onEditLive={handleEditLiveClass}  // Pass the editing function
        editedLiveData={editModalData}  // Pass the data for editing
      />
    </div>
  );
}

export default Lives;
