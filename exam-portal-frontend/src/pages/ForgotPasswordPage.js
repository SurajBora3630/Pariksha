import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'; // Import the axios library
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert

const ForgotPasswordPage = () => {
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [error, setError] = useState('');

  const securityQuestions = [
    'Select a security question',
    'What is your pet\'s name?',
    'Where were you born?',
    'What is your favorite food?',
    'What is your favorite sport?'
  ];

  const navigate = useNavigate();

  const handleSecurityQuestionChange = (e) => {
    setSecurityQuestion(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setSecurityAnswer(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/forgotPassword', null, {
        params: {
          securityQuestion: securityQuestion,
          securityAnswer: securityAnswer,
        },
      });

      if (response.data.username && response.data.password) {
        const { username, password } = response.data;
        setResetPassword(`Username: ${username}`);
        setError('');
        Swal.fire({
          icon: 'success',
          title: 'Reset Password',
          html: `Username: ${username}`,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Close',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/reset-password');
          }
        });
      } else {
        setError('Security question answer is incorrect.');
      }
    } catch (error) {
      setError('Failed to reset password. Please try again later.');
    }
  };

  return (
    <div className="my-5">
      <div className="card">
        <div className="card-body">
          <h4 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
            Forgot Password
          </h4>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="securityQuestion" className="mb-4">
              <Form.Label>Select Security Question</Form.Label>
              <Form.Control
                as="select"
                value={securityQuestion}
                onChange={handleSecurityQuestionChange}
              >
                {securityQuestions.map((question, index) => (
                  <option key={index} value={question}>{question}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="securityAnswer" className="mb-4">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your answer"
                value={securityAnswer}
                onChange={handleAnswerChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Reset Password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
