import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { BiSolidCommentAdd } from 'react-icons/bi';
// import './modal/CategoryAdd.css'; // Add your CSS styles for the modal here
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

export default function PlanAddModal({ isOpen, onRequestClose, onAddPlan }) {
  const [formError, setFormError] = useState({});
  const [type, setType] = useState(''); // Initialize with an empty string
  const [amount, setAmount] = useState('');

  const handleAddPlan = async (e) => {
    e.preventDefault();
    const errors = validate(type, amount);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const planData = {
          type,
          amount,
        };

        await onAddPlan(planData);
        setFormError({});
        setType('');
        setAmount('');
        onRequestClose();
        showToast('Plan added successfully!', 'success');
      } catch (error) {
        console.error('Error adding plan:', error.response.data);
        showToast('Error adding plan', 'error');
      }
    }
  };

  const validate = (type, amount) => {
    const errors = {};

    if (!type) {
      errors.type = 'Plan type is required';
    }

    if (!amount) {
      errors.amount = 'Amount is required';
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
      contentLabel="Add Plan Modal"
      className="custom-modal" // Add your custom modal class
      overlayClassName="custom-overlay" // Add your custom overlay class
      style={{
        content: {
          backgroundColor: '#c7d2d9', 
        },
      }}
    >
      <div className="modal-content p-4 ">
        <div className="header">
          <div className="close-icon" onClick={onRequestClose}>
            <FaTimes className="text-gray-500 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mt-4">Add Plan</h2>
        <form onSubmit={handleAddPlan}>
          {/* Use a select element for the plan type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded p-2 mt-2"
          >
            <option value="">Select Plan Type</option>
            <option value="Basic">Basic</option>
            <option value="Medium">Medium</option>
            <option value="Premium">Premium</option>
          </select>
          <span className="text-red-500">{formError?.type ? formError.type : ''}</span>

          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded p-2 mt-2"
          />
          <span className="text-red-500">{formError?.amount ? formError.amount : ''}</span>

          <div className="buttonDiv mt-4">
            <button
              type="submit"
              className="add-button bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mx-auto"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}