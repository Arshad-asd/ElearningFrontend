// LiveCard.js
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import the edit and trash icons
import { tutorInstance } from '../../../Containers/Utils/axios';
import { useNavigate } from 'react-router-dom';

const LiveCard = ({ liveClass, onEdit, onDelete }) => {
  const [isJoinButtonEnabled, setIsJoinButtonEnabled] = useState(false);
  const navigate = useNavigate();

  const { id, access_code, title, course_name, start_time, date, status } = liveClass;
  const roomId = access_code;

  useEffect(() => {
    const currentDate = new Date();
    const stringDateandTime = `${date} ${start_time}`;
    const combinedDate = new Date(stringDateandTime);

    const isSameDate = currentDate.toDateString() === combinedDate.toDateString();
    const isTimeGreaterThanCurrent = combinedDate <= currentDate;

    if (isSameDate && isTimeGreaterThanCurrent) {
      setIsJoinButtonEnabled(true);
    } else {
      setIsJoinButtonEnabled(false);
    }
  }, [date, start_time]);

  const changeStatus = async (id) => {
    const response = await tutorInstance.patch(`/live-status-update/${id}/`, {
      status: 'ongoing',
    });
  };

  const handleJoinClick = (roomId, id) => {
    if (isJoinButtonEnabled) {
      changeStatus(id);
      navigate(`/tutor/room/${roomId}/${id}`);
    }
  };

  const handleDeleteClick = (id) => {
    // Call the onDelete function passed as a prop
    onDelete(id);
  };

  return (
    <Card style={{ margin: '8px', backgroundColor: '#edf7f7', position: 'relative' }}>
      {/* Edit icon in the top-right corner */}
      <Button
        variant="link"
        style={{
          position: 'absolute',
          top: '5px',
          right: '30px',
        }}
        onClick={() => onEdit(liveClass)}
      >
        <FaEdit size={20} color="#ffc107" />
      </Button>

      {/* Delete icon in the top-right corner */}
      <Button
        variant="link"
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
        }}
        onClick={() => handleDeleteClick(id)}
      >
        <FaTrash size={20} color="red" />
      </Button>

      <Card.Body>
        <Card.Title className="fw-bold">{title}</Card.Title>
        <Card.Text>
          <div>
            <span className="fw-bold">Subject:</span> {course_name}
          </div>
          <div style={{ color: 'green', textDecoration: 'bold' }}>
            <span className="fw-bold" style={{ color: 'black' }}>
              Time:
            </span>{' '}
            {start_time}
          </div>
          <div>
            <span className="fw-bold">Date:</span> {date}
          </div>
          <div
            style={{
              backgroundColor: '#09ead55e',
              borderRadius: '5px',
              color: 'red',
            }}
          >
            <span className="fw-bold">Status</span>: {status}
          </div>
        </Card.Text>
        <div style={{ marginBottom: '10px' }}>
          <Button
            variant="dark"
            style={{ width: '100%' }}
            onClick={() => handleJoinClick(roomId, id)}
            disabled={!isJoinButtonEnabled}
          >
            {isJoinButtonEnabled ? 'Join Now' : 'Join Disabled'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LiveCard;
