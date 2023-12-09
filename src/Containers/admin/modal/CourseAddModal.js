// CourseAddModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import { AiOutlineVideoCameraAdd, AiOutlineDelete } from "react-icons/ai";
import { adminInstance } from "../../../Containers/Utils/axios";

const CourseAddModal = ({ isOpen, onRequestClose, onAddCourse }) => {
  const [newCourseData, setNewCourseData] = useState({
    course_name: "",
    category_ref: "",
    sub_category_ref: "",
    tutor_ref: "",
    preview_video: null,
    banner_image: null, // Added banner_image field
    views: 0,
    likes: 0,
    is_active: true,
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    // Fetch categories, subcategories, and tutors when the component mounts
    const fetchData = async () => {
      try {
        const categoriesResponse = await adminInstance.get("/categories/");
        setCategories(categoriesResponse.data);

        const tutorsResponse = await adminInstance.get("/tutors/");
        setTutors(tutorsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length) {
      setNewCourseData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setNewCourseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (name === "category_ref") {
      // If the category changes, fetch the corresponding subcategories
      const selectedCategoryId = value;
      const fetchSubCategories = async () => {
        try {
          const subCategoriesResponse = await adminInstance.get(
            `/categories/${selectedCategoryId}/subcategories/`
          );
          setSubCategories(subCategoriesResponse.data);
        } catch (error) {
          console.error("Error fetching subcategories", error);
        }
      };

      fetchSubCategories();
    }
  };

  const handleDeleteVideo = () => {
    setNewCourseData((prevData) => ({
      ...prevData,
      preview_video: null,
    }));
  };

  const handleDeleteBannerImage = () => {
    setNewCourseData((prevData) => ({
      ...prevData,
      banner_image: null,
    }));
  };

  const handleAddCourse = async () => {
    try {
      const formData = new FormData();

      Object.entries(newCourseData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Call the onAddCourse callback with the form data
      onAddCourse(formData);

      // Reset the form and close the modal
      setNewCourseData({
        course_name: "",
        category_ref: "",
        sub_category_ref: "",
        tutor_ref: "",
        preview_video: null,
        banner_image: null,
        views: 0,
        likes: 0,
        is_active: true,
      });
      onRequestClose();
    } catch (error) {
      console.error("Error adding course", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Course Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="flex justify-between items-center mb-4">
        <h2>Add Course</h2>
        <button onClick={onRequestClose} className="text-gray-500">
          <MdClose size={24} />
        </button>
      </div>
      <form className="flex flex-wrap">
        <div className="w-full md:w-1/2 p-2">
          <label>
            Course Name
            <input
              type="text"
              name="course_name"
              value={newCourseData.course_name}
              onChange={handleInputChange}
              className="w-full"
            />
          </label>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <label>
            Category
            <select
              name="category_ref"
              value={newCourseData.category_ref}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <label>
            Sub Category
            <select
              name="sub_category_ref"
              value={newCourseData.sub_category_ref}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            >
              <option value="" disabled>
                Select a subcategory
              </option>
              {subCategories &&
                subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.sub_category_name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <label>
            Tutor
            <select
              name="tutor_ref"
              value={newCourseData.tutor_ref}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            >
              <option value="" disabled>
                Select a tutor
              </option>
              {tutors &&
                tutors.map((tutor) => (
                  <option key={tutor.id} value={tutor.id}>
                    {tutor.email}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="w-full p-2 relative">
          <label>
            Preview Video
            <div className="flex items-center">
              <input
                type="file"
                name="preview_video"
                accept=".mp4"
                onChange={handleInputChange}
                className="hidden"
              />
              <AiOutlineVideoCameraAdd
                onClick={() =>
                  document.querySelector('input[name="preview_video"]').click()
                }
                className="ml-2 cursor-pointer text-blue-500"
                style={{ fontSize: "24px" }}
              />
              {newCourseData.preview_video && (
                <div className="flex items-center bg-red-300">
                  <span className="border border-gray-400 px-2 py-1 ml-2">
                    {newCourseData.preview_video.name}
                  </span>
                  <AiOutlineDelete
                    onClick={handleDeleteVideo}
                    className="ml-2 cursor-pointer text-red-500"
                    style={{ fontSize: "24px" }}
                  />
                </div>
              )}
            </div>
          </label>
        </div>
        <div className="w-full p-2 relative">
          <label>
            Banner Image
            <div className="flex items-center">
              <input
                type="file"
                name="banner_image"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
              <AiOutlineVideoCameraAdd
                onClick={() =>
                  document.querySelector('input[name="banner_image"]').click()
                }
                className="ml-2 cursor-pointer text-blue-500"
                style={{ fontSize: "24px" }}
              />
              {newCourseData.banner_image && (
                <div className="flex items-center bg-red-300">
                  <span className="border border-gray-400 px-2 py-1 ml-2">
                    {newCourseData.banner_image.name}
                  </span>
                  <AiOutlineDelete
                    onClick={handleDeleteBannerImage}
                    className="ml-2 cursor-pointer text-red-500"
                    style={{ fontSize: "24px" }}
                  />
                </div>
              )}
            </div>
          </label>
        </div>
        <div className="w-full p-2">
          <button
            type="button"
            onClick={handleAddCourse}
            className="bg-blue-400 text-white py-2 px-4 rounded"
          >
            Add Course
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CourseAddModal;
