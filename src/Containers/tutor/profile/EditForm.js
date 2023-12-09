import React, { useState, useEffect } from "react";
import "./Profile.css";
import { tutorInstance } from "../../Utils/axios";
import { toast } from "react-toastify";

function EditForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    city: "",
    state: "",
    country: "",
    qualification: "",
    skills: "",
    category: "",
    subjects: "",
  });

  const [categories, setCategories] = useState([]);

  // Fetch the token from localStorage
  const userId = localStorage.getItem("tutorInfo")
    ? JSON.parse(localStorage.getItem("tutorInfo")).user_id
    : null;
  const token = localStorage.getItem("tutorInfo")
    ? JSON.parse(localStorage.getItem("tutorInfo")).access
    : null;

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      await tutorInstance.put(`/update-profile/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast("Profile details updated", "success");
    } catch (error) {
      showToast("Error updating user details", "error");
      console.error("Error updating profile details", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const response = await tutorInstance.get(`/user-profile/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        setFormData(userData);

        // Fetch categories
        const categoriesResponse = await tutorInstance.get("/categories/");
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [userId, token]);

  return (
    <>
      <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
        <div className="card h-100">
          <div className="card-body">
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <h6 className="mb-3 text-primary">Personal Details</h6>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="first_name">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    placeholder="Enter full name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="eMail">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="State">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    placeholder="Enter State"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="url"
                    className="form-control"
                    id="country"
                    placeholder="enter country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <h6 className="mb-3 text-primary mt-2">Qualification</h6>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="Street">Dgree</label>

                  <input
                    type="name"
                    className="form-control"
                    id="qualification"
                    placeholder="Enter degree"
                    value={formData.qualification}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="ciTy">Skills</label>
                  <input
                    type="name"
                    className="form-control"
                    id="skills"
                    placeholder="Enter Skills"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    className="form-control"
                    id="category"
                    value={formData.category || ""}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="zIp">Subjects</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subjects"
                    placeholder="enter subjects"
                    value={formData.subjects}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="text-right d-flex justify-content-center">
                  <button
                    type="button"
                    id="submit"
                    name="submit"
                    className="btn btn-primary mt-3"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditForm;
