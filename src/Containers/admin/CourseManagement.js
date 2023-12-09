// CourseManagement.jsx
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { ImBlocked } from "react-icons/im";
import { CgUnblock } from "react-icons/cg";
import { BiSolidEdit } from "react-icons/bi";
import { HiExclamationCircle } from "react-icons/hi";
import { GoCheckCircleFill } from "react-icons/go";
import { adminInstance } from "../Utils/axios";
import "./UserManagement.css";
import CourseAddModal from "./modal/CourseAddModal";
// import EditCourseModal from "./modal/EditCourseModal";
import { toast } from "react-toastify";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "course_name", headerName: "Course Name", width: 130 },
  {
    field: "category_ref",
    headerName: "Category",
    width: 130,
    valueGetter: (params) => params.row.category_ref.category_name || "",
  },
  {
    field: "sub_category_ref",
    headerName: "Sub Category",
    width: 130,
    valueGetter: (params) => params.row.sub_category_ref.sub_category_name || "",
  },
  {
    field: "tutor_ref",
    headerName: "Tutor",
    width: 130,
    valueGetter: (params) => params.row.tutor_ref.email || "",
  },
  {
    field: "preview_video",
    headerName: "Preview Video",
    width: 200,
    renderCell: (params) => (
      <video width="100%" height="100%" controls>
        <source src={params.value} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ),
  },
  { field: "views", headerName: "Views", width: 100 },
  { field: "likes", headerName: "Likes", width: 100 },
  {
    field: "is_active",
    headerName: "Active",
    width: 100,
    renderCell: (params) => (
      params.value ? (
        <GoCheckCircleFill color="green" style={{ fontSize: "24px" }} />
      ) : (
        <HiExclamationCircle color="red" style={{ fontSize: "24px" }} />
      )
    ),
  },
];

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

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await adminInstance.get("/course-list/");
      console.log(response.data);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = async (courseData) => {
    try {
      await adminInstance.post(`/course-create/`, courseData);
      fetchCourses();
      showToast("Course added", "success");
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding course", error);
      if (error.response) {
        console.error("Response error", error.response);
        const errorMessage =
          error.response.data.detail || "An error occurred while adding the course";
        toast.error(errorMessage);
      } else if (error.request) {
        console.error("Request error", error.request);
        toast.error("No response received from the server");
      } else {
        console.error("Unexpected error", error.message);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const handleUpdateCourse = async (updatedCourseData, courseId) => {
    try {
      await adminInstance.put(`/courses/${courseId}/`, updatedCourseData);
      fetchCourses();
      showToast("Course updated", "success");
      setIsEditModalOpen(false);
    } catch (error) {
      showToast("Error updating course", "error");
      console.error("Error updating course", error);
    }
  };

  const handleBlockUnblockCourse = async (courseId, isBlocked) => {
    try {
      await adminInstance.patch(`/block-unblock-course/${courseId}/`, {
        is_active: !isBlocked,
      });
      fetchCourses();
      showToast(`Course ${isBlocked ? 'Unblocked' : 'Blocked'}`, "success");
    } catch (error) {
      showToast("Error updating course", "error");
      console.error("Error updating course", error);
    }
  };

  const columnsWithActions = [
    ...columns,
    {
      field: "blockUnblock",
      headerName: "Block/Unblock",
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleBlockUnblockCourse(params.row.id, params.row.is_active)}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            {params.row.is_active ? <ImBlocked color="red" style={{ fontSize: "24px" }} /> : <CgUnblock color="green" style={{ fontSize: "24px" }} />}
          </button>{" "}
        </div>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 130,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleEditCourse(params.row)}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            <BiSolidEdit style={{ fontSize: "24px", color: "blue" }} />
          </button>{" "}
        </div>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "pink", height: "100vh" }}>
      <div className="data-grid-container">
        <div className="header d-flex justify-content-between align-items-center mb-4">
          <div style={{ fontWeight: "bold" }}>Course Management</div>
          <div
            className="d-flex align-items-center"
            onClick={() => setIsAddModalOpen(true)}
          >
            <AiOutlineAppstoreAdd style={{ fontSize: "30px" }} /> Add
          </div>
        </div>
        <div className="h-500 w-full overflow-hidden border border-gray-300">
          <DataGrid
            rows={courses}
            columns={columnsWithActions}
            pageSize={5}
            checkboxSelection
            sx={{ backgroundColor: "white" }}
            isCellEditable={(params) => params.field !== "id"}
            onCellEditCommit={(params) => {
              const updatedData = [...courses];
              updatedData[params.id - 1][params.field] = params.props.value;
              handleUpdateCourse(updatedData[params.id - 1]);
            }}
          />
        </div>

        <CourseAddModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
          onAddCourse={handleAddCourse}
        />
        {/*
        <EditCourseModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          onUpdateCourse={(updatedData) =>
            handleUpdateCourse(updatedData, selectedCourse.id)
          }
          courseData={selectedCourse}
        /> */}
      </div>
    </div>
  );
};

export default CourseManagement;
