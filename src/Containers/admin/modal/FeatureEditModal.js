import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

const FeatureEditModal = ({ isOpen, onRequestClose, onUpdateFeature, featureData }) => {
  const [updatedFeatureData, setUpdatedFeatureData] = useState({});

  useEffect(() => {
    // Update the state when featureData changes
    setUpdatedFeatureData(featureData || {});
  }, [featureData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFeatureData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const { id } = featureData;
    onUpdateFeature(updatedFeatureData, id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Feature Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="flex justify-end">
        {/* Close icon button */}
        <button onClick={onRequestClose} className="text-gray-500">
          <AiOutlineClose size={24} />
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Edit Feature</h2>
      <form>
        <label className="block mb-2">
          Feature Text:
          <input
            type="text"
            name="feature_text"
            value={updatedFeatureData.feature_text || ""}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full mt-1"
          />
        </label>
        {/* Add other input fields for editing feature data */}
        <button
          type="button"
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Feature
        </button>
      </form>
    </Modal>
  );
};

export default FeatureEditModal;
