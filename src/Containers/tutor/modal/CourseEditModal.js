// EditCourseModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { FcAddImage } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";

Modal.setAppElement("#root");

const EditCourseModal = ({ isOpen, onRequestClose, onUpdateCourse, courseData }) => {
  const [updatedCourseData, setUpdatedCourseData] = useState({
    course_name: "",
    preview_video: null,
  });

  const [errors, setErrors] = useState({
    course_name: "",
    preview_video: "",
  });

  useEffect(() => {
    setUpdatedCourseData({
      course_name: courseData?.course_name || "",
      preview_video: courseData?.preview_video || null,
    });
  }, [courseData]);

  const handleInputChange = (name, value) => {
    setUpdatedCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleFileDelete = (name) => {
    setUpdatedCourseData((prevData) => ({
      ...prevData,
      [name]: null,
    }));
  };

  const getFilePreview = (file) => {
    return file ? (typeof file === "string" ? file : URL.createObjectURL(file)) : null;
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!updatedCourseData.course_name.trim()) {
      newErrors.course_name = "Please enter a course name.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleUpdate = () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("course_name", updatedCourseData.course_name);
  
      // Check if preview_video is not null before appending to avoid issues
      if (updatedCourseData.preview_video !== null) {
        formData.append("preview_video", updatedCourseData.preview_video);
      }
  
      onUpdateCourse(formData);
      onRequestClose();
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Course Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={onRequestClose}>
          <IoMdClose size={24} />
        </button>
      </div>
      <h2>Edit Course</h2>
      <form className="grid grid-cols-2 gap-4">
        <div className="mb-4 col-span-2">
          <label className="block">
            Course Name:
            <input
              type="text"
              name="course_name"
              value={updatedCourseData.course_name}
              onChange={(e) => handleInputChange("course_name", e.target.value)}
              className="w-full border p-2 rounded"
            />
            {errors.course_name && (
              <p className="text-red-500">{errors.course_name}</p>
            )}
          </label>
        </div>

        <div className="mb-4">
          {updatedCourseData.preview_video ? (
            <>
              <FaTrash
                size={24}
                onClick={() => handleFileDelete("preview_video")}
                className="cursor-pointer text-red-500"
              />
              <label className="block">
                Preview Video:
                <div className="flex justify-center items-center">
                  <div className="flex items-center">
                    <video
                      src={getFilePreview(updatedCourseData.preview_video)}
                      alt="Preview Video"
                      className="mr-2 w-24 h-24"
                      controls
                    />
                  </div>
                </div>
              </label>
            </>
          ) : (
            <label className="block">
              Preview Video:
              <div className="flex justify-center items-center">
                <div className="flex items-center">
                  <FcAddImage size={65} className="mr-2" />
                  <label className="flex items-center">
                    <input
                      type="file"
                      accept="video/*"
                      name="preview_video"
                      onChange={(e) =>
                        handleInputChange("preview_video", e.target.files[0])
                      }
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </label>
          )}
          {errors.preview_video && (
            <p className="text-red-500">{errors.preview_video}</p>
          )}
        </div>

        {/* Add other fields as needed */}

        <button
          type="button"
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-2"
        >
          Update Course
        </button>
      </form>
    </Modal>
  );
};

export default EditCourseModal;
