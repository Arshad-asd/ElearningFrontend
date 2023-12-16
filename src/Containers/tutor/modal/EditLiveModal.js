import React, { useState, useEffect } from "react";
import { parse } from 'date-fns';
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tutorInstance } from "../../Utils/axios";

Modal.setAppElement("#root");

const EditLiveModal = ({ isOpen, onRequestClose, onEditLive, editedLiveData }) => {
  const [updatedLiveData, setUpdatedLiveData] = useState({

  });
  const [errors, setErrors] = useState({
    title: "",
    start_time:"",
    date: "",
    access_code: "",
    course_ref: "",
  });

  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    // Fetch the course list when the component mounts
    fetchCourseList();

    // Set the initial state based on editedLiveData
    setUpdatedLiveData({
      id: editedLiveData?.id,
      title: editedLiveData?.title || "emptww",
      start_time: editedLiveData?.start_time
      ? parse(editedLiveData?.start_time, "h:mm aa", new Date())
      : new Date(),
    date: editedLiveData?.date ? new Date(editedLiveData?.date) : new Date(),
      status: editedLiveData?.status || "",
      access_code: editedLiveData?.access_code || "",
      course_ref: editedLiveData?.course_ref || "",

    });
  }, [editedLiveData]); 
  const fetchCourseList = async () => {
    try {
      const response = await tutorInstance.get("/courses/");
      setCourseList(response.data);
    } catch (error) {
      console.error("Error fetching course list:", error);
    }
  };

  const handleInputChange = (name, value) => {
    let updatedValue = value;
  
    // Format date and time values if the input is a string
    if (name === "start_time" || name === "date") {
      try {
        // Attempt to parse the date string
        const parsedDate = Date.parse(value);
  
        // Check if the parsing is successful and the result is a valid date
        if (!isNaN(parsedDate) && isFinite(parsedDate)) {
          updatedValue = new Date(parsedDate);
        } else {
          throw new Error("Invalid date or time format");
        }
      } catch (error) {
        // Handle the error (e.g., log or set a default value)
        console.error(`Error parsing ${name} string:`, error);
        updatedValue = new Date(); // Set a default value if the parsing fails
      }
    }
  
    setUpdatedLiveData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  
  const handleEdit = () => {
    if (validateForm()) {
      const formattedData = {
        ...updatedLiveData,
        date: updatedLiveData.date.toISOString().split("T")[0],
        start_time: updatedLiveData.start_time.toISOString().split("T")[1].split(".")[0],
      };
  
      onEditLive(formattedData);
      onRequestClose();
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // ... (your existing validation code)

    setErrors(newErrors);
    return isValid;
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Live Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={onRequestClose}>
          <IoMdClose size={24} />
        </button>
      </div>
      <h2>Edit Live</h2>
      <form className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block">
            Title:
            <input
              type="text"
              name="title"
              value={updatedLiveData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full border p-2 rounded"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Start Time:

            <DatePicker
              selected={updatedLiveData.start_time}
              onChange={(date) => handleInputChange("start_time", date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              className="w-full border p-2 rounded"
              filterTime={(time) => {
                const currentDate = new Date();
                const selectedDateTime = new Date(updatedLiveData.date);
                selectedDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);

                // If the selected date and time are before the current date and time, filter it out
                if (selectedDateTime <= currentDate) {
                  return false;
                }

                return true;
              }}
            />
            {errors?.start_time && (
              <p className="text-red-500">{errors?.start_time}</p>
            )}
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Date:
            <DatePicker
              selected={updatedLiveData.date}
              onChange={(date) => handleInputChange("date", date)}
              dateFormat="MM/dd/yyyy"
              className="w-full border p-2 rounded"
              minDate={new Date()}
            />
            {errors.date && <p className="text-red-500">{errors.date}</p>}
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Access Code:
            <input
              type="text"
              name="access_code"
              value={updatedLiveData.access_code}
              onChange={(e) => handleInputChange("access_code", e.target.value)}
              className="w-full border p-2 rounded"
            />
            {errors.access_code && (
              <p className="text-red-500">{errors.access_code}</p>
            )}
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Course Reference:
            <select
              name="course_ref"
              value={updatedLiveData.course_ref}
              onChange={(e) => handleInputChange("course_ref", e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="" disabled>
                Select a course
              </option>
              {courseList &&
                courseList.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_name}
                  </option>
                ))}
            </select>
            {errors.course_ref && (
              <p className="text-red-500">{errors.course_ref}</p>
            )}
          </label>
        </div>

        <button
          type="button"
          onClick={handleEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-2"
        >
          Save Changes
        </button>
      </form>
    </Modal>
  );
};

export default EditLiveModal;
