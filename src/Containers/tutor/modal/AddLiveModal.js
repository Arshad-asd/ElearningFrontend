import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tutorInstance } from "../../Utils/axios";

Modal.setAppElement("#root");

const AddLiveModal = ({ isOpen, onRequestClose, onAddLive }) => {
  const [newLiveData, setNewLiveData] = useState({
    title: "",
    start_time: new Date(),
    date: new Date(),
    status: "scheduled",
    access_code: "",
    course_ref: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    start_time: "",
    date: "",
    access_code: "",
    course_ref: "",
  });

  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    // Fetch the course list when the component mounts
    fetchCourseList();
  }, []);

  const fetchCourseList = async () => {
    try {
      const response = await tutorInstance.get("/courses/"); // Replace with your actual endpoint
      setCourseList(response.data); // Assuming the courses are directly in the response data
      console.log(response.data, "tutor_course");
    } catch (error) {
      console.error("Error fetching course list:", error);
    }
  };

  const handleInputChange = (name, value) => {
    setNewLiveData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear errors when the user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate title
    if (!newLiveData.title.trim()) {
      newErrors.title = "Please enter a title.";
      isValid = false;
    }

    // Validate start_time
    if (!newLiveData.start_time) {
      newErrors.start_time = "Please choose a start time.";
      isValid = false;
    }

    // Validate date
    if (!newLiveData.date) {
      newErrors.date = "Please choose a date.";
      isValid = false;
    }

    // Validate access_code
    if (!newLiveData.access_code.trim()) {
      newErrors.access_code = "Please enter an access code.";
      isValid = false;
    }

    // Validate course_ref
    if (!newLiveData.course_ref) {
      newErrors.course_ref = "Please select a course.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAdd = () => {
    if (validateForm()) {
      // Format the date and time
      const formattedData = {
        ...newLiveData,
        date: newLiveData.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
        start_time: newLiveData.start_time.toISOString().split("T")[1], // Format time as hh:mm:ss
      };
  
      onAddLive(formattedData);
      setNewLiveData({
        title: "",
        start_time: new Date(),
        date: new Date(),
        status: "scheduled",
        access_code: "",
        course_ref: "",
      });
      onRequestClose();
    }
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Live Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={onRequestClose}>
          <IoMdClose size={24} />
        </button>
      </div>
      <h2>Add Live</h2>
      <form className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block">
            Title:
            <input
              type="text"
              name="title"
              value={newLiveData.title}
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
              selected={newLiveData.start_time}
              onChange={(date) => handleInputChange("start_time", date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              className="w-full border p-2 rounded"
            />
            {errors.start_time && (
              <p className="text-red-500">{errors.start_time}</p>
            )}
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Date:
            <DatePicker
              selected={newLiveData.date}
              onChange={(date) => handleInputChange("date", date)}
              dateFormat="MM/dd/yyyy"
              className="w-full border p-2 rounded"
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
              value={newLiveData.access_code}
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
              value={newLiveData.course_ref}
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
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-2"
        >
          Add Live
        </button>
      </form>
    </Modal>
  );
};

export default AddLiveModal;
