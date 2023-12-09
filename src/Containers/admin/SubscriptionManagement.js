// SubscriptionManagement.js

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BiPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import { adminInstance } from "../../Containers/Utils/axios";
// import SubscriptionEditModal from "./modal/SubscriptionEditModal";
import { toast } from "react-toastify";

export default function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "user_ref", headerName: "User", width: 150 , valueGetter: (params) => params.row.user_ref.email || "",},
    { field: "plan_ref", headerName: "Plan ", width: 150 , valueGetter: (params) => params.row.plan_ref.type || "",},
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "subscription_type", headerName: "Subscription Type", width: 150 },
    { field: "purchase_date", headerName: "Purchase Date", width: 200 },
    { field: "expire_date", headerName: "Expire Date", width: 200 },
    { field: "is_active", headerName: " Active", width: 120 },
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
      const res = await adminInstance.get("/subscriptions/");
      setSubscriptions(res.data);
      console.log(res.data)
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (subscription) => {
    setSelectedSubscription(subscription);
    setIsEditModalOpen(true);
  };

  const handleUpdateSubscription = async (updatedSubscriptionData, subscriptionId) => {
    try {
      await adminInstance.patch(`/edit-subscription/${subscriptionId}/`, updatedSubscriptionData);
      fetchData();
      showToast("Subscription updated successfully!", "success");
      setIsEditModalOpen(false);
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
                <Link to="/admin/subscriptions/" style={{ textDecoration: "none" }}>
                  Subscription Management
                </Link>
              </div>
            </div>
            <DataGrid
              rows={subscriptions}
              columns={columns}
              pageSize={5}
              checkboxSelection
              getRowId={(row) => row.id}
              className="bg-white"
            />
          </div>

          {/* <SubscriptionEditModal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            onUpdateSubscription={handleUpdateSubscription}
            subscriptionData={selectedSubscription}
          /> */}
        </div>
      </div>
    </>
  );
}
