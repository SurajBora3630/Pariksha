import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "./AdminProfileUpdatePage.css";
import Swal from "sweetalert2";

const AdminProfileUpdatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state && location.state.initialData;

  const [updatedFields, setUpdatedFields] = useState({
    firstName: initialData ? initialData.firstName : "",
    lastName: initialData ? initialData.lastName : "",
    phoneNumber: initialData ? initialData.phoneNumber : "",
    // Add other fields as needed
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    // Add other fields' errors as needed
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    // Clear previous errors
    setErrors({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      // Clear other fields' errors as needed
    });

    // Validate fields
    let hasErrors = false;
    if (!updatedFields.firstName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "First Name is required",
      }));
      hasErrors = true;
    }
    if (!updatedFields.lastName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "Last Name is required",
      }));
      hasErrors = true;
    }
    if (!updatedFields.phoneNumber) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Phone Number is required",
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", updatedFields.firstName);
      formData.append("lastName", updatedFields.lastName);
      formData.append("phoneNumber", updatedFields.phoneNumber);

      // Make an API request to update the admin's profile
      const response = await fetch(`/api/updateUser/${user.userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully!",
          confirmButtonText: "Close",
        }).then((result) => {
          if (result.isConfirmed) {
            // Log out the user
            localStorage.removeItem("user");
            localStorage.removeItem("jwtToken");
            navigate("/login"); // Redirect to the login page
          }
        });
      } else {
        console.error("Profile update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <div className="adminProfileUpdatePage__container">
        <div className="adminProfileUpdatePage__sidebar">
          <Sidebar />
        </div>
        <div className="adminProfileUpdatePage__content">
          <div className="container mt-5">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">Update Admin Profile</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={updatedFields.firstName}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    {errors.firstName && (
                      <p className="error">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={updatedFields.lastName}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    {errors.lastName && (
                      <p className="error">{errors.lastName}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={updatedFields.phoneNumber}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    {errors.phoneNumber && (
                      <p className="error">{errors.phoneNumber}</p>
                    )}
                  </div>
                  {/* Add other form fields for admin information */}
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfileUpdatePage;
