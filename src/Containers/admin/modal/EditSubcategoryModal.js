// EditSubcategoryModal.js (without image field)
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { adminInstance } from '../../Utils/axios';

Modal.setAppElement('#root');

const EditSubcategoryModal = ({
  isOpen,
  onRequestClose,
  onUpdateSubcategory,
  subcategoryData,
}) => {
  const [formError, setFormError] = useState({});
  const [subCategoryName, setSubCategoryName] = useState(subcategoryData?.sub_category_name || '');
  const [selectedCategory, setSelectedCategory] = useState(subcategoryData?.category_name || '');
  const [categories, setCategories] = useState([]); // State to hold the list of categories

  useEffect(() => {
    setSubCategoryName(subcategoryData?.sub_category_name || '');
    setSelectedCategory(subcategoryData?.category_name || '');

    // Fetch categories when the modal is opened
    fetchCategories();
  }, [isOpen, subcategoryData]);

  const fetchCategories = async () => {
    try {
      const response = await adminInstance.get('/categories/');
      const data = response.data;
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const handleUpdateSubcategory = async (e) => {
    e.preventDefault();
    const errors = validate(subCategoryName);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const updatedSubcategoryData = {
          sub_category_name: subCategoryName,
          category_name: selectedCategory,
          subcategoryId: subcategoryData.id,
        };

        await onUpdateSubcategory(updatedSubcategoryData);

        setSubCategoryName('');
        setSelectedCategory('');
        setFormError({});
        onRequestClose();
        showToast('Subcategory updated successfully!', 'success');
      } catch (error) {
        console.error('Error updating subcategory:', error.response?.data);
        showToast('Error updating subcategory', 'error');
      }
    }
  };

  const validate = (subCategoryName) => {
    const errors = {};

    if (!subCategoryName) {
      showToast('Subcategory name is required', 'error');
      errors.subCategoryName = 'Subcategory name is required';
    } else if (subCategoryName.length < 3) {
      errors.subCategoryName = 'Enter at least 3 characters';
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
      onRequestClose={onRequestClose}
      contentLabel="Edit Subcategory Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content p-4">
        <div className="header">
          <div className="close-icon" onClick={onRequestClose}>
            <FaTimes className="text-gray-500 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mt-4">Edit Subcategory</h2>
        <input
          type="text"
          placeholder="Subcategory Name"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          className="w-full border rounded p-2 mt-2"
        />
        <span className="text-red-500">
          {formError?.subCategoryName ? formError.subCategoryName : ''}
        </span>

        {/* Add the category select input */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border rounded p-2 mt-2"
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
            onClick={handleUpdateSubcategory}
            className="add-button bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mx-auto"
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditSubcategoryModal;
