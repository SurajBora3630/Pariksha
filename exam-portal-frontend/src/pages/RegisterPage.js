import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { FaUser, FaLock, FaPhone, FaEyeSlash, FaEye } from 'react-icons/fa';
import { register } from '../actions/authActions';
import { USER_REGISTER_SUCCESS } from '../constants/authConstants';
import Loader from '../components/Loader';
import { MDBContainer, MDBCardImage, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [securityQuestion, setSecurityQuestion] = useState("What is your pet's name?");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const securityQuestions = [
    "Select a security question",
    "What is your pet's name?",
    "Where were you born?",
    "What is your favorite food?",
    "What is your favorite sport?"
  ];

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [securityAnswerError, setSecurityAnswerError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerReducer = useSelector((state) => state.registerReducer);

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    if (temp) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const showConfirmPasswordHandler = () => {
    const temp = !showConfirmPassword;
    setShowConfirmPassword(temp);
    if (temp) {
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordType("password");
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length < 4) {
      return "weak";
    } else if (password.length >= 4 && password.length <= 7) {
      return "good";
    } else {
      return "strong";
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFirstNameError(e.target.value.trim() === "" ? "First Name is required." : "");
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setLastNameError(e.target.value.trim() === "" ? "Last Name is required." : "");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError(e.target.value.trim() === "" ? "Username is required." : "");
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(
      newPassword.trim() === ""
        ? "Password is required."
        : !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(newPassword)
        ? "Password must have at least one lowercase letter, one uppercase letter, one digit, and one special character."
        : ""
    );
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordError(
      newConfirmPassword.trim() === "" ? "Confirm Password is required." : newConfirmPassword !== password ? "Passwords do not match." : ""
    );
  };

  const handleSecurityQuestionChange = (e) => {
    setSecurityQuestion(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    setPhoneNumberError(
      newPhoneNumber.trim() === "" || newPhoneNumber.length !== 10 || !/^\d+$/.test(newPhoneNumber)
        ? "Please enter a valid 10-digit phone number."
        : ""
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (firstName.trim() === "") {
      setFirstNameError("First Name is required.");
      return;
    }
    if (username.trim() === "") {
      setUsernameError("Username is required.");
      return;
    }
    if (username.includes(" ")) {
      setUsernameError("Username cannot contain spaces.");
      return;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required.");
      return;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(password)) {
      setPasswordError("Password must have at least one lowercase letter, one uppercase letter, one digit, and one special character.");
      return;
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm Password is required.");
      return;
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }
    if (phoneNumber.trim() === "" || phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      setPhoneNumberError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (securityAnswer.trim() === "") {
      setSecurityAnswerError("Security Answer is required.");
      return;
    }

    const user = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      phoneNumber: phoneNumber,
      securityQuestion: securityQuestion,
      securityAnswer: securityAnswer
    };

    register(dispatch, user)
      .then((data) => {
        if (data.type === USER_REGISTER_SUCCESS) {
          Swal.fire({
            title: 'Success',
            text: 'Registration successful!',
            icon: 'success',
            confirmButtonText: 'Close'
          }).then(() => {
            navigate("/login");
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Registration failed. Please try again.',
            icon: 'error',
            confirmButtonText: 'Close'
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: `Registration failed: ${error.message}`,
          icon: 'error',
          confirmButtonText: 'Close'
        });
      });
  };

  return (
    <div className="register-page-container">
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="6">
            <MDBCard className="my-5 rounded-3" style={{ maxWidth: "600px" }}>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' style={{ maxWidth: "100%", height: "auto" }} alt="Sample photo" />
              <MDBCardBody className="px-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Sign Up</h3>

                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-4" controlId="fname">
                    <Form.Label>
                      <FaUser className="icon me-3" />
                      First Name
                    </Form.Label>
                    <MDBInput
                      id="form1"
                      type="text"
                      value={firstName}
                      onChange={handleFirstNameChange}
                    />
                    {firstNameError && <div className="error-message">{firstNameError}</div>}
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="lname">
                    <Form.Label>
                      <FaUser className="icon me-3" />
                      Last Name
                    </Form.Label>
                    <MDBInput
                      id="form2"
                      type="text"
                      value={lastName}
                      onChange={handleLastNameChange}
                    />
                    {lastNameError && <div className="error-message">{lastNameError}</div>}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="username">
                    <Form.Label>
                      <FaUser className="icon me-3" />
                      Username
                    </Form.Label>
                    <MDBInput
                      id="form3"
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                    {usernameError && <div className="error-message">{usernameError}</div>}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label>
                      <FaLock className="icon me-3" />
                      Password
                    </Form.Label>
                    <InputGroup>
                      <MDBInput
                        id="form4"
                        type={`${passwordType}`}
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <Button
                        onClick={showPasswordHandler}
                        variant=""
                        style={{ border: "1px solid black", color: "black" }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                    {passwordError && <div className="error-message">{passwordError}</div>}
                    {password && (
                      <div className={`password-strength ${getPasswordStrength(password)}`}>
                        {getPasswordStrength(password)}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="confirmPassword">
                    <Form.Label>
                      <FaLock className="icon me-3" />
                      Confirm Password
                    </Form.Label>
                    <InputGroup>
                      <MDBInput
                        id="form5"
                        type={`${confirmPasswordType}`}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                      <Button
                        onClick={showConfirmPasswordHandler}
                        variant=""
                        style={{ border: "1px solid black", color: "black" }}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                    {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="phoneNumber">
                    <Form.Label>
                      <FaPhone className="icon me-3" />
                      Phone Number
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
                      <MDBInput
                        id="form6"
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                      />
                      {phoneNumberError && <div className="error-message">{phoneNumberError}</div>}
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="securityQuestion">
                    <Form.Label>Security Question</Form.Label>
                    <Form.Control as="select" value={securityQuestion} onChange={handleSecurityQuestionChange}>
                      {securityQuestions.map((question, index) => (
                        <option key={index} value={question}>{question}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="securityAnswer">
                    <Form.Label>Security Answer</Form.Label>
                    <MDBInput
                      type="text"
                      value={securityAnswer}
                      onChange={(e) => setSecurityAnswer(e.target.value)}
                    />
                    {securityAnswerError && <div className="error-message">{securityAnswerError}</div>}
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="registerButton">
                    <MDBBtn color="success" size="lg" className="register-button" type="submit">
                      {registerReducer.loading ? <Loader /> : "Register"}
                    </MDBBtn>
                  </Form.Group>
                </Form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default RegisterPage;
