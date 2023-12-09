import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineAppstoreAdd } from 'react-icons/ai'; 
import { FaBan, FaCheck } from "react-icons/fa";
import {RiEditBoxFill} from "react-icons/ri";
import { toast } from 'react-toastify';
import { adminInstance } from '../Utils/axios';
import AddSubcategoryModal from './modal/AddSubcategoryModal';
import EditSubcategoryModal from './modal/EditSubcategoryModal'; // Import the EditSubcategoryModal

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'sub_category_name', headerName: 'Sub_category_name', width: 200 },
  { field: 'category_name', headerName: 'Category_name', width: 200 },
  {
    field: 'is_active',
    headerName: 'Active',
    width: 200,
    renderCell: (params) => (
      params.value ? (
        <FaCheck color="green" style={{ fontSize: '24px' }} />
      ) : (
        <FaBan color="red" style={{ fontSize: '24px' }} />
      )
    ),
  },
];

const SubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State for Edit modal
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // State to hold selected subcategory for editing

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalOpen = (subCategory) => {
    setSelectedSubcategory(subCategory);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setSelectedSubcategory(null);
    setEditModalOpen(false);
  };

  const handleAddSubcategory = async (newSubCategoryData) => {
    try {
      await adminInstance.post('create/sub-categories/', newSubCategoryData);
      showToast('Added subcategory', 'success');
      await fetchSubCategories();
      handleAddModalClose();
    } catch (error) {
      showToast('Error adding subcategory', 'error');
      console.error('Error adding subcategory', error);
    }
  };

  const handleUpdateSubcategory = async (updatedSubcategoryData) => {
    try {
      await adminInstance.put(`update/sub-categories/${updatedSubcategoryData.subcategoryId}/`, updatedSubcategoryData);
      showToast('Updated subcategory', 'success');
      await fetchSubCategories();
      handleEditModalClose();
    } catch (error) {
      showToast('Error updating subcategory', 'error');
      console.error('Error updating subcategory', error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await adminInstance.get('/sub-categories/');
      const data = response.data;
      setSubCategories(data);
    } catch (error) {
      console.error('Error fetching subcategories', error);
    }
  };

  const handleBlockUnblockSubCategory = async (subCategoryId, isActive) => {
    try {
      await adminInstance.patch(`/sub-categories/block-unblock/${subCategoryId}/`, {
        is_active: !isActive,
      });
      await fetchSubCategories();
      showToast(`Subcategory ${isActive ? 'Unblocked' : 'Blocked'}`, 'success');
    } catch (error) {
      showToast('Error updating subcategory', 'error');
      console.error('Error updating subcategory', error);
    }
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

  const columnsWithActions = [
    ...columns,
    {
      field: 'blockUnblock',
      headerName: 'Block/Unblock',
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleBlockUnblockSubCategory(params.row.id, params.row.is_active)}
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          >
            {params.row.is_active ? (
              <FaBan color="red" style={{ fontSize: '24px' }} />
            ) : (
              <FaCheck color="green" style={{ fontSize: '24px' }} />
            )}
          </button>{' '}
        </div>
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleEditModalOpen(params.row)}
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          >
            <RiEditBoxFill style={{ fontSize: "24px" }} />
          </button>{' '}
        </div>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: 'pink', height: '100vh' }}>
      <div className="data-grid-container">
        <div className="header d-flex justify-content-between align-items-center mb-4">
          <div style={{ fontWeight: 'bold' }}>SubCategory Management</div>
          <div className="d-flex align-items-center" onClick={handleAddModalOpen}>
            <AiOutlineAppstoreAdd style={{ fontSize: '30px' }} /> Add
          </div>
        </div>
        <DataGrid
          rows={subCategories}
          columns={columnsWithActions}
          pageSize={5}
          checkboxSelection
          autoHeight={false}
          sx={{ backgroundColor: 'white' }}
        />
      </div>

      {/* Add Subcategory Modal */}
      <AddSubcategoryModal
        isOpen={isAddModalOpen}
        onClose={handleAddModalClose}
        onAdd={handleAddSubcategory}
      />

      {/* Edit Subcategory Modal */}
      {selectedSubcategory && (
        <EditSubcategoryModal
          isOpen={isEditModalOpen}
          onRequestClose={handleEditModalClose}
          onUpdateSubcategory={handleUpdateSubcategory}
          subcategoryData={selectedSubcategory}
        />
      )}
    </div>
  );
};

export default SubCategory;
