import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarUser from "../../components/SidebarUser";
import "./UserProfileUpdate.css";
import { Card, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const UserProfileUpdate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user;
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({
      firstName: "",
      lastName: "",
      phoneNumber: "",
    });

    // Validate fields
    let hasErrors = false;
    if (!formData.firstName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "First Name is required",
      }));
      hasErrors = true;
    }
    if (!formData.lastName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "Last Name is required",
      }));
      hasErrors = true;
    }
    if (!formData.phoneNumber.match(/^\d{10}$/)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Please enter a 10-digit phone number",
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    try {
      // Create a URLSearchParams object to send data as form parameters
      const params = new URLSearchParams();
      params.append("firstName", formData.firstName);
      params.append("lastName", formData.lastName);
      params.append("phoneNumber", formData.phoneNumber);

      // Make an API request to update the user's profile with form parameters
      const response = await fetch(`/api/updateUser/${user.userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded", // Specify the content type for form parameters
        },
        body: params.toString(), // Convert the URLSearchParams object to a string
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
      <div className="userProfileUpdate__container">
        <div className="userProfileUpdate__sidebar">
          <SidebarUser />
        </div>
        <div className="userProfileUpdate__content">
          <Card>
            <Card.Body>
              <h2>Update Your Profile</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required // Marked as required
                  />
                  {errors.firstName && (
                    <p className="error">{errors.firstName}</p>
                  )}
                </Form.Group>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required // Marked as required
                  />
                  {errors.lastName && (
                    <p className="error">{errors.lastName}</p>
                  )}
                </Form.Group>
                <Form.Group controlId="phoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel" // Changed input type to "tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    pattern="[0-9]{10}" // Added pattern for 10 digits
                    title="Please enter a 10-digit phone number" // Added custom error message
                    required // Marked as required
                  />
                  {errors.phoneNumber && (
                    <p className="error">{errors.phoneNumber}</p>
                  )}
                </Form.Group>
                {/* Add other form fields for user information */}
                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default UserProfileUpdate;
