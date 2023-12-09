import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { PiFileVideo } from "react-icons/pi";
import { FcAddImage, FcCancel } from "react-icons/fc"; // Import the cancel icon
import { FaTrash } from "react-icons/fa";
import { tutorInstance } from "../../Utils/axios";

Modal.setAppElement("#root");

const AddLessonModal = ({ isOpen, onRequestClose, onAddLesson }) => {
  const [newLessonData, setNewLessonData] = useState({
    lesson_name: "",
    lesson_video: null,
    thumbnail_image: null,
    course_ref: "",
  });

  const [errors, setErrors] = useState({
    lesson_name: "",
    lesson_video: "",
    thumbnail_image: "",
    course_ref: "",
  });

  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    // Fetch the course list when the component mounts
    fetchCourseList();
  }, []);

  const fetchCourseList = async () => {
    try {
      const response = await tutorInstance.get("/courses/");
      setCourseList(response.data);
    } catch (error) {
      console.error("Error fetching course list:", error);
    }
  };

  const handleInputChange = (name, value) => {
    setNewLessonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear errors when the user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleFileDelete = (name) => {
    setNewLessonData((prevData) => ({
      ...prevData,
      [name]: null,
    }));
  };

  const getImagePreview = (file) => {
    return file ? URL.createObjectURL(file) : null;
  };

  const getVideoPreview = (file) => {
    return file ? URL.createObjectURL(file) : null;
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate lesson_name
    if (!newLessonData.lesson_name.trim()) {
      newErrors.lesson_name = "Please enter a lesson name.";
      isValid = false;
    }

    // Validate lesson_video
    if (!newLessonData.lesson_video) {
      newErrors.lesson_video = "Please choose a lesson video file.";
      isValid = false;
    }

    // Validate thumbnail_image
    if (!newLessonData.thumbnail_image) {
      newErrors.thumbnail_image = "Please choose a thumbnail image file.";
      isValid = false;
    }

    // Validate course_ref
    if (!newLessonData.course_ref) {
      newErrors.course_ref = "Please select a course.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAdd = () => {
    if (validateForm()) {
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("lesson_name", newLessonData.lesson_name);
      formData.append("lesson_video", newLessonData.lesson_video);
      formData.append("thumbnail_image", newLessonData.thumbnail_image);
      formData.append("course_ref", newLessonData.course_ref);

      onAddLesson(formData);
      setNewLessonData({
        lesson_name: "",
        lesson_video: null,
        thumbnail_image: null,
        course_ref: "",
      });
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Lesson Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={onRequestClose}>
          <IoMdClose size={24} />
        </button>
      </div>
      <h2>Add Lesson</h2>
      <form className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block">
            Lesson Name:
            <input
              type="text"
              name="lesson_name"
              value={newLessonData.lesson_name}
              onChange={(e) => handleInputChange("lesson_name", e.target.value)}
              className="w-full border p-2 rounded"
            />
            {errors.lesson_name && (
              <p className="text-red-500">{errors.lesson_name}</p>
            )}
          </label>
        </div>

        <div className="">
          <label className="block">
            <span className="mb-4">Course Reference:</span>
            <select
              name="course_ref"
              value={newLessonData.course_ref}
              onChange={(e) => handleInputChange("course_ref", e.target.value)}
              className="w-full border p-2 rounded mt-2 h-11"
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

        <div className="mb-4">
          <label className="block">
            Lesson Video:
            <div className="flex justify-center items-center">
              {newLessonData.lesson_video ? (
                <div className="flex items-center">
                  <PiFileVideo size={65} className="mr-2" />
                  <video
                    src={getVideoPreview(newLessonData.lesson_video)}
                    alt="Lesson Video Preview"
                    className="mr-2"
                    controls
                  />
                  <FaTrash 
                    size={24}
                    onClick={() => handleFileDelete("lesson_video")}
                    className="cursor-pointer text-red-500"
                  />
                </div>
              ) : (
                <>
                  <PiFileVideo size={65} className="mr-2" />
                  <label className="flex items-center">
                    <input
                      type="file"
                      accept="video/*"
                      name="lesson_video"
                      onChange={(e) =>
                        handleInputChange("lesson_video", e.target.files[0])
                      }
                      className="hidden"
                    />
           
                  </label>
                </>
              )}
            </div>
            {errors.lesson_video && (
              <p className="text-red-500">{errors.lesson_video}</p>
            )}
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Thumbnail Image:
            <div className="flex justify-center items-center">
              {newLessonData.thumbnail_image ? (
                <div className="flex items-center">
                  <FcAddImage size={65} className="mr-2" />
                  <img
                    src={getImagePreview(newLessonData.thumbnail_image)}
                    alt="Thumbnail Preview"
                    className="mr-2"
                    style={{ maxHeight: "100px" }}
                  />
                  <FaTrash 
                    size={24}
                    onClick={() => handleFileDelete("thumbnail_image")}
                    className="cursor-pointer text-red-500"
                  />
                </div>
              ) : (
                <>
                  <FcAddImage size={65} className="mr-2" />
                  <label className="flex items-center">
                    <input
                      type="file"
                      accept="image/*"
                      name="thumbnail_image"
                      onChange={(e) =>
                        handleInputChange("thumbnail_image", e.target.files[0])
                      }
                      className="hidden"
                    />
               
                  </label>
                </>
              )}
            </div>
            {errors.thumbnail_image && (
              <p className="text-red-500">{errors.thumbnail_image}</p>
            )}
          </label>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-2"
        >
          Add Lesson
        </button>
      </form>
    </Modal>
  );
};

export default AddLessonModal;
