import { DataGrid } from "@mui/x-data-grid";
import { FaUnlock, FaLock } from "react-icons/fa";
import "./UserManagement.css";
import { useEffect, useState } from "react";
import { adminInstance } from "../../Containers/Utils/axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [blocked, setBlocked] = useState(false);

  // Define columns with details for each field
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "phone_number", headerName: "Mobile Number", width: 130 },
    { field: "first_name", headerName: "First Name", width: 100 },
    { field: "last_name", headerName: "Last Name", width: 90 },
    { field: "date_joined", headerName: "Joined Date", width: 150 },
    { field: "last_login_display", headerName: "Last Login", width: 150 },
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
      width: 100,
      renderCell: (params) => (
        <button
          className={`custom-button${
            params.row.is_active ? "-inactive" : "-active"
          }`}
          onClick={(e) =>
            handleBlockClick(e, params.row.id, params.row.is_active)
          }
        >
          {params.row.is_active ? <FaLock size={18} /> : <FaUnlock size={18} />}
        </button>
      ),
    },
    {
      field: "details",
      headerName: "Details",
      width: 100,
      renderCell: (params) => (
        <button
          className="button-pill"
          onClick={(e) => handleDetailsClick(e, params.row)}
        >
          View
        </button>
      ),
    },
  ];

  const handleBlockClick = async (e, userId) => {
    e.stopPropagation();
    try {
      setBlocked(!blocked);
      const response = await adminInstance.patch(`/block-unblock/${userId}/`);
      // fetchData();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handleDetailsClick = (e, row) => {
    e.stopPropagation();
    const userId = row.id;
    // Assuming you have a function to handle details modal
    // setModalDetails(row.details);
    // setOpenModals((prevOpenModals) => ({
    //   ...prevOpenModals,
    //   [userId]: true,
    // }));
  };

  const fetchData = async () => {
    try {
      const url = searchTerm ? `users/?search=${searchTerm}` : "users/";
      const res = await adminInstance.get(url);
      setFilteredRows(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [blocked, searchTerm]);

  return (
    <>
      <div className="data-grid-container">
        <div className="header d-flex justify-content-between align-items-center mb-4">
          <div>
            <Link to="/live" style={{ textDecoration: "none" }}>
              UserManagement
            </Link>
          </div>
          <div className="d-flex align-items-center">
            <input
              type="text"
              placeholder="Search User"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control "
              style={{ marginRight: '8px' }}
            />
            <button className="btn btn-primary" onClick={fetchData}>
              <FaSearch className="search-icon" />
            </button>
          </div>
        </div>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          getRowId={(row) => row.id}
        />
      </div>
    </>
  );
}
