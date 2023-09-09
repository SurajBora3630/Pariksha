import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import './ResetPasswordPage.css'; // Import your custom CSS file

const ResetPasswordPage = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const validatePasswordStrength = (password) => {
    // Password strength rules: At least 8 characters, 1 uppercase, 1 lowercase, 1 digit
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const goodRegex = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/;

    if (strongRegex.test(password)) {
      return 'Strong';
    } else if (goodRegex.test(password)) {
      return 'Good';
    } else {
      return 'Weak';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    const passwordStrength = validatePasswordStrength(newPassword);

    if (passwordStrength === 'Weak') {
      setErrorMessage('Password is too weak. It must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 digit.');
      return;
    }

    try {
      const response = await axios.put('/api/resetPassword', null, {
        params: {
          username: username,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        },
      });

      if (response.status === 200) {
        setErrorMessage('');
        Swal.fire({
          icon: 'success',
          title: 'Reset Password',
          text: 'Your password has been reset successfully.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Go to Login',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          }
        });
      } else {
        setErrorMessage('Failed to reset password. Please check your old password.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Bad Request. Please check the provided information.');
      } else {
        setErrorMessage('Failed to reset password. Please try again later.');
      }
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2 className="reset-password-title">Reset Password</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group controlId="newPassword" className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </Form.Group>
          <Form.Group controlId="confirmNewPassword" className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="reset-password-button">
            Reset Password
          </Button>
        </Form>
        <div className="password-strength-indicator">
          Password Strength: {validatePasswordStrength(newPassword)}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
