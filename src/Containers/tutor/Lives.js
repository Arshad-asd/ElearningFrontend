// Lives.js
import React, { useState, useEffect } from 'react';
import LiveCard from '../../Components/Cards/TutorCard/LiveCard';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AddLiveModal from './modal/AddLiveModal';
import EditLiveModal from './modal/EditLiveModal';
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

  const fetchUserLiveClasses = async () => {
    try {
      const response = await tutorInstance.get('/lives-list/', {});

      setUserLiveClasses(response.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
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

  const handleEditLive = (liveClass) => {
    setEditModalData(liveClass);
    setShowModal(true);
  };

  const handleEditLiveClass = async (editedLiveData) => {
    try {
      const response = await tutorInstance.put(`/live-class-update/${editedLiveData.id}/`, editedLiveData);

      showToast('Live updated', 'success');
      console.log('Live class updated successfully:', response.data);

      fetchUserLiveClasses();
    } catch (error) {
      handleApiError(error);
    }
  };

  // Function to handle deleting the live class
  const handleDeleteLiveClass = async (id) => {
    try {
      const response = await tutorInstance.delete(`/live-class/${id}/delete/`);

      showToast('Live deleted', 'success');
      console.log('Live class deleted successfully:', response.data);

      fetchUserLiveClasses();  // Fetch updated live classes after deletion
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
              <Button variant="primary" onClick={handleOpenAddModal}>
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
                onDelete={handleDeleteLiveClass}  // Pass the delete function
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
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        onEditLive={handleEditLiveClass}
        editedLiveData={editModalData}
      />
    </div>
  );
}

export default Lives;