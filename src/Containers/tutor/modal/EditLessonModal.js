import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { PiFileVideo } from "react-icons/pi";
import { FcAddImage } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";
import { tutorInstance } from "../../Utils/axios";

Modal.setAppElement("#root");

const EditLessonModal = ({ isOpen, onRequestClose, onUpdateLesson, lessonData }) => {
  const [updatedLessonData, setUpdatedLessonData] = useState({
    lesson_name: "",
    lesson_video: null,
    thumbnail_image: null,
   // course_ref: "",
  });

  const [errors, setErrors] = useState({
    lesson_name: "",
    lesson_video: "",
    thumbnail_image: "",
   // course_ref: "",
  });

//   const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    // Fetch the course list when the component mounts
    // fetchCourseList();

    // Set the initial state based on lessonData
    setUpdatedLessonData({
      lesson_name: lessonData?.lesson_name || "",
      lesson_video: lessonData?.lesson_video || null,
      thumbnail_image: lessonData?.thumbnail_image || null,
      //course_ref: lessonData?.course_ref || "",
    });
  }, [lessonData]);

//   const fetchCourseList = async () => {
//     try {
//       const response = await tutorInstance.get("/courses/");
//       setCourseList(response.data);
//     } catch (error) {
//       console.error("Error fetching course list:", error);
//     }
//   };

  const handleInputChange = (name, value) => {
    setUpdatedLessonData((prevData) => ({
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
    setUpdatedLessonData((prevData) => ({
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

    // Validate lesson_name
    if (!updatedLessonData.lesson_name.trim()) {
      newErrors.lesson_name = "Please enter a lesson name.";
      isValid = false;
    }

    // Validate course_ref
    // if (!updatedLessonData.course_ref) {
    //   newErrors.course_ref = "Please select a course.";
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const handleUpdate = () => {
    if (validateForm()) {
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("lesson_name", updatedLessonData.lesson_name);
      formData.append("lesson_video", updatedLessonData.lesson_video);
      formData.append("thumbnail_image", updatedLessonData.thumbnail_image);
    //   formData.append("course_ref", updatedLessonData.course_ref);

      onUpdateLesson(formData);
      onRequestClose();
    }
  };
return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Lesson Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={onRequestClose}>
          <IoMdClose size={24} />
        </button>
      </div>
      <h2>Edit Lesson</h2>
      <form className="grid grid-cols-2 gap-4">
        <div className="mb-4 col-span-2">
          <label className="block">
            Lesson Name:
            <input
              type="text"
              name="lesson_name"
              value={updatedLessonData.lesson_name}
              onChange={(e) => handleInputChange("lesson_name", e.target.value)}
              className="w-full border p-2 rounded"
            />
            {errors.lesson_name && (
              <p className="text-red-500">{errors.lesson_name}</p>
            )}
          </label>
        </div>
  
        <div className="mb-4">
          {updatedLessonData.lesson_video ? (
            <FaTrash
              size={24}
              onClick={() => handleFileDelete("lesson_video")}
              className="cursor-pointer text-red-500"
            />
          ) : (
            <></>
          )}
          <label className="block">
            Lesson Video:
            <div className="flex justify-center items-center">
              {updatedLessonData.lesson_video ? (
                <div className="flex items-center">
                  <video
                    src={getFilePreview(updatedLessonData.lesson_video)}
                    alt="Lesson Video Preview"
                    className="mr-2 w-24 h-24"
                    controls
                  />
                </div>
              ) : (
                <div className="flex items-center">
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
                </div>
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
              {updatedLessonData.thumbnail_image ? (
                <div className="flex items-center">
                  <img
                    src={getFilePreview(updatedLessonData.thumbnail_image)}
                    alt="Thumbnail Image Preview"
                    className="mr-2"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
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
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-2"
        >
          Update Lesson
        </button>
      </form>
    </Modal>
  );
  
};

export default EditLessonModal;
