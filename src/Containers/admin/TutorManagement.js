import { DataGrid } from "@mui/x-data-grid";
import { FaUnlock, FaLock } from "react-icons/fa";
import "./UserManagement.css";
import { useEffect, useState } from "react";
import { adminInstance } from "../../Containers/Utils/axios";

// import DetailsModal from './DetailsModal';

export default function TutorManagement() {
  // const [buttonClicked,setButtonClicked] = useState(false)
  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "phone_number", headerName: "Mobil number", width: 130 },
    { field: "first_name", headerName: "First name", width: 90 },
    { field: "last_name", headerName: "Last name", width: 90 },
    { field: "date_joined", headerName: "joined_date", width: 130 },
    { field: "last_login_display", headerName: "last_login", width: 130 },
    {
      field: "is_active",
      headerName: "Active",
      width: 130,
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
      renderCell: (params) => {
        return (
          <button
            className={`custom-button${
              params.row.is_active ? "-inactive" : "-active"
            }`}
            onClick={(e) =>
              handleBlockClick(e, params.row.id, params.row.is_active)
            }
          >
            {params.row.is_active ? (
              <FaLock size={18} />
            ) : (
              <FaUnlock size={18} />
            )}
          </button>
        );
      },
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
  const [openModals, setOpenModals] = useState({});
  const [modalDetails, setModalDetails] = useState("");
  const [blocked, setBlocked] = useState(false);
  const handleBlockClick = async (e, userId, isBlocked) => {
    e.stopPropagation();
    try {
      setBlocked(!blocked);

      const response = await adminInstance.patch(`/tutor/block-unblock/${ userId }/`, );
      // fetchData();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };
  useEffect(() => {
    fetchData();
    // setBlocked(!blocked)
  }, [blocked]);
  const handleDetailsClick = (e, row) => {
    e.stopPropagation();
    const userId = row._id;
    setModalDetails(row.details);
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [userId]: true,
    }));
  };

  const closeDetailsModal = (userId) => {
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [userId]: false, // Close the modal for the specific user
    }));
  };

  const fetchData = async () => {
    try {
      const res = await adminInstance.get("/tutors/");
      console.log("Response:", res.data); // Log the response to the console
      setRows(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [rows, setRows] = useState([]);

  return (
    <>
      <div className="data-grid-container">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          getRowId={(row) => row.id} // Specify the property to be used as the unique id
        />
      </div>

      {/* {rows.map((row) => (
  // <DetailsModal
  //   key={row._id}
  //   isOpen={openModals[row._id] || false}
  //   onClose={() => closeDetailsModal(row._id)}
  //   details={row.details}  // Pass the user-specific details
  // />
))} */}
    </>
  );
}
