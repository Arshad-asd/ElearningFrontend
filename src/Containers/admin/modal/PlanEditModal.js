import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

export default function PlanEditModal({ isOpen, onRequestClose, onUpdatePlan, planData }) {
  const [formError, setFormError] = useState({});
  const [type, setType] = useState(planData?.type || '');
  const [amount, setAmount] = useState(planData?.amount || '');

  useEffect(() => {
    setType(planData?.type || '');
    setAmount(planData?.amount || '');
  }, [planData]);

  const handleUpdatePlan = async (e) => {
    e.preventDefault();
    const errors = validate(type, amount);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const updatedPlanData = {
          type,
          amount,
        };

        await onUpdatePlan(updatedPlanData, planData.id);
        setFormError({});
        onRequestClose();
        showToast('Plan updated successfully!', 'success');
      } catch (error) {
        handleApiError(error);
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

  const handleApiError = (error) => {
    if (error.response) {
      const errorMessage = error.response.data.detail || 'Error updating plan';
      showToast(errorMessage, 'error');
    } else if (error.request) {
      showToast('No response from the server', 'error');
    } else {
      showToast('Error updating plan', 'error');
    }
    console.error('Error updating plan:', error);
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
      contentLabel="Edit Plan Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content p-4 bg-gray-300">
        <div className="header">
          <div className="close-icon" onClick={onRequestClose}>
            <FaTimes className="text-gray-500 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mt-4">Edit Plan</h2>
        <form onSubmit={handleUpdatePlan}>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
