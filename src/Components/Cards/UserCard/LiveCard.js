import { Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const LiveCard = ({ liveClass }) => {
  const [isJoinButtonEnabled, setIsJoinButtonEnabled] = useState(false);

  const navigate = useNavigate();

  const { id,access_code, title, course_name, start_time, date, status } = liveClass;
  const roomId = access_code


  useEffect(() => {
    const currentDate = new Date();
    const stringDateandTime = `${date} ${start_time}`;
    const combinedDate = new Date(stringDateandTime);
  
    // Check if the date is the same as the current date
    const isSameDate = currentDate.toDateString() === combinedDate.toDateString();
  
    // Check if the time is greater than the current time
    const isTimeGreaterThanCurrent = combinedDate <= currentDate;
  
    // Enable the join button if both conditions are met
    if (isSameDate && isTimeGreaterThanCurrent) {
      setIsJoinButtonEnabled(true);
    } else {
      setIsJoinButtonEnabled(false);
    }
  
    console.log('current date', currentDate);
  }, [date, start_time]);


  const handleJoinClick = (roomId) => {
    navigate(`/room/${roomId}`);
  };
  return (
    <Card style={{ margin: '8px', backgroundColor: '#edf7f7' }}>
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
          <div style={{ backgroundColor: '#09ead55e', borderRadius: '5px', color: 'red' }}>
            <span className="fw-bold">Status</span>: {status}
          </div>
        </Card.Text>
        <Button variant="dark" style={{ width: '100%' }} disabled={!isJoinButtonEnabled}  onClick={() => handleJoinClick(roomId)}>
          {isJoinButtonEnabled ? "Join Now" : "Join Disabled"}

        </Button>
      </Card.Body>
    </Card>
  );
};

export default LiveCard;
