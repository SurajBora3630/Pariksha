import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert
import { login } from "../actions/authActions";
import Loader from "../components/Loader";
import "./LoginPage.css";
import * as authConstants from "../constants/authConstants";
import ForgotPasswordPage from './ForgotPasswordPage';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    if (temp) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await login(dispatch, username, password).then((data) => {
        if (data.type === authConstants.USER_LOGIN_SUCCESS) {
          data.payload.roles.map((r) => {
            if (r["roleName"] === "ADMIN") {
              navigate("/adminProfile");
            } else {
              navigate("/userProfile");
            }
          });
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      // Display a SweetAlert for login error
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: "Invalid username or password. Please try again.",
      });
    }
  };

  return (
    <div className="my-5">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              style={{ width: "100%", height: "100%" }}
              alt="login form"
            />
          </div>
          <div className="col-md-6">
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="d-flex flex-row mt-2 align-items-center"></div>
              <h4
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h4>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="username" className="mb-4">
                  <Form.Label>Username </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={passwordType}
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputGroup.Text
                      onClick={showPasswordHandler}
                      className="password-toggle-button"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Button
                  variant="dark"
                  className="mb-4 px-5"
                  type="submit"
                  disabled={loginReducer.loading}
                >
                  {loginReducer.loading ? <Loader /> : "Login"}
                </Button>
              </Form>
              <div className="d-flex flex-column align-items-center">
                <Link
                  className="small text-muted mb-2"
                  to="/forgot-password"
                >
                  Forgot password?
                </Link>
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <Link to="/register" style={{ color: "#393f81" }}>
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
