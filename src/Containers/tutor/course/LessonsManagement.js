import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddLessonModal from '../modal/AddLessonsModal';
import EditLessonModal from '../modal/EditLessonModal';
import { tutorInstance } from '../../Utils/axios';
import { DataGrid } from '@mui/x-data-grid';

function LessonsManagement() {
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null); 

  const handleShowLessonModal = () => {
    setShowLessonModal(true);
    setSelectedLesson(null);  // Clear selected lesson when opening the modal for adding
  };

  const handleShowEditLessonModal = (lesson) => {
    setShowLessonModal(true);
    setSelectedLesson(lesson);  // Set the selected lesson when opening the modal for editing
  };

  const handleCloseLessonModal = () => {
    setShowLessonModal(false);
    setSelectedLesson(null);  // Clear selected lesson when closing the modal
  };


  const handleAddLesson = async (newLessonData) => {
    try {
      const response = await tutorInstance.post('/create-lessons/', newLessonData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      showToast('Lesson added', 'success');
      console.log('Lesson added successfully:', newLessonData);

      // Update your lesson list or perform any other necessary actions
      fetchLessons();
    } catch (error) {
      handleApiError(error);
    }
  };


  const handleUpdateLesson = async (updatedLessonData) => {
    try {
      const response = await tutorInstance.patch(
        `/lessons-edit/${selectedLesson.id}/`,
        updatedLessonData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      showToast('Lesson updated', 'success');
      console.log('Lesson updated successfully:', updatedLessonData);

      // Update your lesson list or perform any other necessary actions
      fetchLessons();
    } catch (error) {
      handleApiError(error);
    }
  };

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

  const fetchLessons = async () => {
    try {
      const response = await tutorInstance.get('/lessons-list/');
      console.log(response.data,'lessons list')
      setLessons(response.data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'lesson_name', headerName: 'Lesson Name', width: 200 },
    {
      field: "lesson_video",
      headerName: "lesson_video",
      width: 200,
      renderCell: (params) => (
        <video width="100%" height="100%" controls>
          <source src={params.value} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ),
    },
    {
      field: 'thumbnail_image',
      headerName: 'Thumbnail Image',
      width: 200,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Thumbnail"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ),
    },
    {
      field: 'course_ref',
      headerName: 'Course Reference',
      width: 200,
      valueGetter: (params) => params.row.course_ref.course_name || '',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            variant="outline-secondary"
            onClick={() => handleShowEditLessonModal(params.row)}
          >
            Edit
          </Button>
          {/* You can add a delete button here if needed */}
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: '100vh', backgroundColor: '#fcdad1' }}>
      <div className="container" style={{ paddingTop: '7rem' }}>
        <div className="row">
          <div className="col">
            <div className="header d-flex justify-content-between align-items-center">
              <div>
                <Link to="/lessons" style={{ textDecoration: 'none' }}>
                  Lessons
                </Link>
              </div>
              <Button variant="primary" onClick={handleShowLessonModal}>
                Add Lessons
              </Button>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="container">
            <DataGrid
              rows={lessons}
              columns={columns}
              pageSize={5}
              checkboxSelection
              sx={{ backgroundColor: 'white' }}
            />
          </div>
        </div>
      </div>

       {/* AddLessonModal component */}
       <AddLessonModal
        isOpen={showLessonModal && !selectedLesson}
        onRequestClose={handleCloseLessonModal}
        onAddLesson={handleAddLesson}
      />

      {/* EditLessonModal component */}
      <EditLessonModal
        isOpen={showLessonModal && selectedLesson}
        onRequestClose={handleCloseLessonModal}
        onUpdateLesson={handleUpdateLesson}
        lessonData={selectedLesson}
      />
    </div>
  );
}

export default LessonsManagement;
