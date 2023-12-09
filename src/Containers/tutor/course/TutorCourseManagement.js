// TutorCourseManagement.jsx
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BiSolidEdit } from "react-icons/bi";
import { tutorInstance } from "../../Utils/axios";
import "../../admin/UserManagement.css";
import { HiExclamationCircle } from "react-icons/hi";
import { GoCheckCircleFill } from "react-icons/go";
import CourseEditModal from "../modal/CourseEditModal";
import { toast } from "react-toastify";

const TutorCourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  const fetchCourses = async () => {
    try {
      const response = await tutorInstance.get("/courses/");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEditCourse = (course) => {
    setSelectedCourse(course || {});
    setIsEditModalOpen(true);
  };

  const handleUpdateCourse = async (updatedCourseData, courseId) => {
    try {
      await tutorInstance.patch(`/edit-course/${courseId}/`, updatedCourseData ,{
        headers: {
        'Content-Type': 'multipart/form-data',
      },});

      fetchCourses();
      showToast("Course updated", "success");
      setIsEditModalOpen(false);
    } catch (error) {
      showToast("Error updating course", "error");
      console.error("Error updating course", error);
    }
  };
  

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
      valueGetter: (params) =>
        params.row.sub_category_ref.sub_category_name || "",
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
    // { field: "views", headerName: "Views", width: 100 },
    // { field: "likes", headerName: "Likes", width: 100 },
    {
      field: "is_active",
      headerName: "Active",
      width: 100,
      renderCell: (params) =>
        params.value ? (
          <GoCheckCircleFill
            color="green"
            style={{ fontSize: "24px" }}
          />
        ) : (
          <HiExclamationCircle
            color="red"
            style={{ fontSize: "24px" }}
          />
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
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
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
          <div style={{ fontWeight: "bold" }}>
            Tutor Course Management
          </div>
        </div>
        <div className="h-500 w-full overflow-hidden border border-gray-300">
          <DataGrid
            rows={courses}
            columns={columns}
            pageSize={5}
            checkboxSelection
            sx={{ backgroundColor: "white" }}
            isCellEditable={(params) => params.field !== "id"}
            onCellEditCommit={(params) => {
              const updatedData = [...courses];
              updatedData[params.id - 1][params.field] =
                params.props.value;
              handleUpdateCourse(updatedData[params.id - 1]);
            }}
          />
        </div>

        <CourseEditModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          onUpdateCourse={(updatedData) =>
            handleUpdateCourse(updatedData, selectedCourse.id)
          }
          courseData={selectedCourse}
        />
      </div>
    </div>
  );
};

export default TutorCourseManagement;
