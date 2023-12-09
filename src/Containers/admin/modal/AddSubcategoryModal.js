// AddSubcategoryModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { adminInstance } from '../../Utils/axios';
import './CategoryAdd.css'
Modal.setAppElement('#root');

const AddSubcategoryModal = ({ isOpen, onClose, onAdd }) => {
  const [newSubCategory, setNewSubCategory] = useState({
    sub_category_name: '',
    category_name: '',
  });
  const [categories, setCategories] = useState([]);
  const [formError, setFormError] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await adminInstance.get('/categories/');
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubCategory((prevData) => ({ ...prevData, [name]: value }));
    // Clear the error when the input changes
    setFormError((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleAddSubCategory = () => {
    // Validation for sub_category_name
    const errors = validate(newSubCategory.sub_category_name);
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    // Pass the new subcategory data to the onAdd function in the parent component
    onAdd(newSubCategory);
  };

  const validate = (subCategoryName) => {
    const errors = {};

    if (!subCategoryName) {
      showToast('Subcategory name is required','error')
      errors.sub_category_name = 'Subcategory name is required';
    } else if (subCategoryName.length < 3) {
      errors.sub_category_name = 'Enter at least 3 characters';
    }

    return errors;
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Subcategory Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content p-4">
        <div className="header">
          <div className="close-icon" onClick={onClose}>
            <FaTimes className="text-gray-500 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mt-4">Add Subcategory</h2>
        <input
          type="text"
          id="sub_category_name"
          name="sub_category_name"
          value={newSubCategory.sub_category_name}
          onChange={handleInputChange}
        />
        <span className="text-red-500">
          {formError?.sub_category_name ? formError.sub_category_name : ''}
        </span>

        <select
          id="category_name"
          name="category_name"
          value={newSubCategory.category_name}
          onChange={handleInputChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.category_name}>
              {category.category_name}
            </option>
          ))}
        </select>

        <div className="buttonDiv mt-4">
          <button
            onClick={handleAddSubCategory}
            className="add-button bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mx-auto"
          >
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddSubcategoryModal;
