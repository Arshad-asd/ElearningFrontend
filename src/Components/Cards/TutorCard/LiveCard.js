import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { tutorInstance } from "../../../Containers/Utils/axios";
import { useNavigate } from "react-router-dom";

const LiveCard = ({ liveClass }) => {
  const [isJoinButtonEnabled, setIsJoinButtonEnabled] = useState(false);
  const navigate = useNavigate();

  const { id, access_code, title, course_name, start_time, date, status } = liveClass;
  const roomId = access_code;

  console.log(start_time,date);
  console.log(new Date());

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
  

  const changeStatus = async (id) => {
    const response = await tutorInstance.patch(`/live-status-update/${id}/`, {
      status: "ongoing",
    });
  };

  const handleJoinClick = (roomId, id) => {
    if (isJoinButtonEnabled) {
      changeStatus(id);
      navigate(`/tutor/room/${roomId}/${id}`);
    }
    // Optionally, you can show a message or handle the case where the button is disabled.
  };

  return (
    <Card style={{ margin: "8px", backgroundColor: "#edf7f7" }}>
      <Card.Body>
        <Card.Title className="fw-bold">{title}</Card.Title>
        <Card.Text>
          <div>
            <span className="fw-bold">Subject:</span> {course_name}
          </div>
          <div style={{ color: "green", textDecoration: "bold" }}>
            <span className="fw-bold" style={{ color: "black" }}>
              Time:
            </span>{" "}
            {start_time}
          </div>
          <div>
            <span className="fw-bold">Date:</span> {date}
          </div>
          <div
            style={{
              backgroundColor: "#09ead55e",
              borderRadius: "5px",
              color: "red",
            }}
          >
            <span className="fw-bold">Status</span>: {status}
          </div>
        </Card.Text>
        <div style={{ marginBottom: "10px" }}>
          <Button
            variant="dark"
            style={{ width: "100%" }}
            onClick={() => handleJoinClick(roomId, id)}
            disabled={!isJoinButtonEnabled}
          >
            {isJoinButtonEnabled ? "Join Now" : "Join Disabled"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LiveCard;
