import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaUnlock, FaLock, FaSearch } from "react-icons/fa";
import { BiSolidCommentAdd, BiPencil } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./UserManagement.css";
import { adminInstance } from "../../Containers/Utils/axios";
import PlanAddModal from "./modal/PlanAddModal";
import PlanEditModal from "./modal/PlanEditModal";

import FeatureDetailModal from "./modal/FeatureDetailModal";
import { toast } from "react-toastify";

export default function PlanManagement() {
  const [filteredRows, setFilteredRows] = useState([]);
  const [blocked, setBlocked] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [selectedPlanFeatures, setSelectedPlanFeatures] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "amount", headerName: "Amount", width: 130 },
    {
      field: "is_active",
      headerName: "Active",
      width: 100,
      renderCell: (params) => (
        <div className={`pill ${params.row.is_active ? "active" : "inactive"}`}>
          {params.row.is_active ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            onClick={() =>
              handleBlockClick(params.row.id, params.row.is_active)
            }
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            {params.row.is_active ? (
              <FaLock color="red" style={{ fontSize: "24px" }} />
            ) : (
              <FaUnlock color="green" style={{ fontSize: "24px" }} />
            )}
          </button>{" "}
        </div>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleEditClick(params.row)}
          style={{ border: "none", background: "none", cursor: "pointer" }}
        >
          <BiPencil color="blue" style={{ fontSize: "24px" }} />
        </button>
      ),
    },
    {
      field: "features",
      headerName: "Features",
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleViewFeaturesClick(params.row.id)}
          className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          View
        </button>
      ),
    },
  ];

  const handleBlockClick = async (planId, isActive) => {
    try {
      setBlocked(!blocked);
      await adminInstance.patch(`/block-unblock-plan/${planId}/`, {
        is_active: !isActive,
      });
      fetchData();
      showToast(`Plan ${isActive ? "Blocked" : "Unblocked"}`, "success");
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleEditClick = (plan) => {
    setSelectedPlan(plan);
    setIsEditModalOpen(true);
  };

  const fetchData = async () => {
    try {
      const res = await adminInstance.get("plans/");
      setFilteredRows(res.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [blocked]);

  const handleAddPlan = async (planData) => {
    try {
      await adminInstance.post("/create/plan/", planData);
      fetchData();
      showToast("Plan added successfully!", "success");
      setIsAddModalOpen(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUpdatePlan = async (updatedPlanData, planId) => {
    try {
      await adminInstance.put(`/plans/${planId}/`, updatedPlanData);
      fetchData();
      showToast("Plan updated successfully!", "success");
      setIsEditModalOpen(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleViewFeaturesClick = async (planId) => {
    try {
      const res = await adminInstance.get(`/view-features/${planId}/`);
      setSelectedPlanFeatures(res.data);
      setIsFeatureModalOpen(true);
      console.log(res.data, "res");
      console.log(selectedPlanFeatures, "data");
    } catch (error) {
      handleApiError(error);
    }
  };
  const handleApiError = (error) => {
    if (error.response) {
      const errorMessage =
        error.response.data.detail || "Error processing request";
      showToast(errorMessage, "error");
    } else if (error.request) {
      showToast("No response from the server", "error");
    } else {
      showToast("Error processing request", "error");
    }
    console.error("Error processing request:", error);
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
        <div className="data-grid-container ">
          <div className="header d-flex justify-content-between align-items-center mb-4">
            <div>
              <Link
                to="/admin/plan-management/"
                style={{ textDecoration: "none" }}
              >
                PlanManagement
              </Link>
            </div>

            <div className="d-flex align-items-center">
              <button onClick={() => setIsAddModalOpen(true)}>
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
            sx={{ backgroundColor: "white" }}
          />
          <div className="flex justify-end mt-4 mr-10">
            <Link
              to="/admin/features/"
              className="flex items-center"
              style={{ textDecoration: "none" }}
            >
              FeatureManagement <AiOutlineArrowRight />
            </Link>
          </div>
        </div>

        <PlanAddModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
          onAddPlan={handleAddPlan}
        />

        <PlanEditModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          onUpdatePlan={handleUpdatePlan}
          planData={selectedPlan}
        />
        <FeatureDetailModal
          isOpen={isFeatureModalOpen}
          onRequestClose={() => setIsFeatureModalOpen(false)}
          features={selectedPlanFeatures}
        />
      </div>
    </>
  );
}
