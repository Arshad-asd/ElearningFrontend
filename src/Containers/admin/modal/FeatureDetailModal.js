import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const FeatureDetailModal = ({ isOpen, onRequestClose, features }) => {
  if (!Array.isArray(features)) {
    // Handle the case where features is not an array
    return <div>No features to display</div>;
  }

  const handleClose = () => {
    onRequestClose(); // Close the modal using the provided function
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Plan Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
      style={{
        content: {
          backgroundColor: '#c7d2d9',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <div className="flex flex-col justify-center items-center w-full">
        <h2 className="text-2xl font-bold mb-4">Plan Features</h2>
        {/* Centered container for the list of features */}
        <div className="flex flex-wrap gap-4 justify-center">
          {features.map((feature) => (
            <div key={feature.id} className="bg-gray-200 p-2 rounded">
              <span className="text-gray-700">{feature.feature_text}</span>
            </div>
          ))}
        </div>
        {/* Right-aligned close button */}
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none mt-4 ml-auto"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default FeatureDetailModal;
