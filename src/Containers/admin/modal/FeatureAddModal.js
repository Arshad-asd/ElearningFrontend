import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

const FeatureAddModal = ({ isOpen, onRequestClose, onAddFeature }) => {
  const [newFeatureData, setNewFeatureData] = useState({
    feature_text: "",
    plan_name: "", // Initialize to an empty string
  });

  const [errors, setErrors] = useState({
    feature_text: "",
    plan_name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeatureData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear errors when user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate feature_text
    if (!newFeatureData.feature_text.trim()) {
      newErrors.feature_text = "Please enter Feature Text.";
      isValid = false;
    }

    // Validate plan_name
    if (!newFeatureData.plan_name) {
      newErrors.plan_name = "Please select a Plan Name.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAdd = () => {
    if (validateForm()) {
      onAddFeature(newFeatureData);
      setNewFeatureData({
        feature_text: "",
        plan_name: "", // Reset to an empty string
      });
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Feature Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={onRequestClose}>
          <IoMdClose size={24} />
        </button>
      </div>
      <h2>Add Feature</h2>
      <form>
        <label className="block mb-4">
          Feature Text:
          <input
            type="text"
            name="feature_text"
            value={newFeatureData.feature_text}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          {errors.feature_text && (
            <p className="text-red-500">{errors.feature_text}</p>
          )}
        </label>
        <label className="block mb-4">
          Plan Name:
          <select
            name="plan_name"
            value={newFeatureData.plan_name}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          >
            <option value="" disabled>
              Select a Plan Name
            </option>
            <option value="Basic">Basic</option>
            <option value="Medium">Medium</option>
            <option value="Premium">Premium</option>
          </select>
          {errors.plan_name && (
            <p className="text-red-500">{errors.plan_name}</p>
          )}
        </label>
        <button
          type="button"
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Feature
        </button>
      </form>
    </Modal>
  );
};

export default FeatureAddModal;
