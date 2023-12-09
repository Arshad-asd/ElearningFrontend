// FeatureManagement.js

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BiPencil ,BiSolidCommentAdd} from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { adminInstance } from "../../Containers/Utils/axios";
import FeatureEditModal from "./modal/FeatureEditModal";
import FeatureAddModal from "./modal/FeatureAddModal";
import "./UserManagement.css";
import { toast } from "react-toastify";

export default function FeatureManagement() {
  const [filteredRows, setFilteredRows] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "feature_text", headerName: "Feature Text", width: 300 },
    { field: "plan_name", headerName: "Plan Name", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center">
          <button
            onClick={() => handleEditClick(params.row)}
            className="border-none bg-none cursor-pointer"
          >
            <BiPencil className="text-blue-500" style={{ fontSize: "24px" }} />
          </button>{" "}
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const res = await adminInstance.get("/features-list/");
      setFilteredRows(res.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (feature) => {
    setSelectedFeature(feature);
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleUpdateFeature = async (updatedFeatureData, featureId) => {
    try {
      await adminInstance.patch(`/edit-features/${featureId}/`, updatedFeatureData);
      fetchData();
      showToast("Feature updated successfully!", "success");
      setIsEditModalOpen(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleAddFeature = async (newFeatureData) => {
    try {
      await adminInstance.post("/create-feature/", newFeatureData);
      fetchData();
      showToast("Feature added successfully!", "success");
      setIsAddModalOpen(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    // Handle API errors
    console.error("API Error:", error);
    showToast("Error processing request", "error");
  };

  const showToast = (message, type = "error") => {
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
    <>
      <div style={{ backgroundColor: "pink", height: "100vh" }}>
        <div className="min-h-screen bg-lightblue">
          <div className="data-grid-container ">
            <div className="header flex justify-between items-center mb-4">
              <div>
                <Link to="/admin/features/" style={{ textDecoration: "none" }}>
                  FeatureManagement
                </Link>
              </div>
              <div className="d-flex align-items-center">
                <button onClick={handleAddClick}>
                  <BiSolidCommentAdd style={{ fontSize: "30px" }} />
                </button>
              </div>
            </div>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              getRowId={(row) => row.id}
              className="bg-white"
            />
            <div className="flex justify-end mt-4 mr-10">
              <Link
                to="/admin/plan-management/"
                className="flex items-center"
                style={{ textDecoration: "none" }}
              >
                PlanManagement <AiOutlineArrowRight />
              </Link>
            </div>
          </div>

          <FeatureEditModal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            onUpdateFeature={handleUpdateFeature}
            featureData={selectedFeature}
          />

          <FeatureAddModal
            isOpen={isAddModalOpen}
            onRequestClose={() => setIsAddModalOpen(false)}
            onAddFeature={handleAddFeature}
          />
        </div>
      </div>
    </>
  );
}
