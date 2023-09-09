import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const [isLoggedIn, setIsLoggedIn] = useState(loginReducer.loggedIn);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const showLogoutConfirmation = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutHandler();
      }
    });
  };

  return (
    <header className="header-container">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="custom-navbar">
        <Container>
          <Navbar.Brand>
            <img src={'images/pariksha-online-examination-portal-logo.png'} alt="Logo" className="logo" />
            Pariksha: Online Examination Portal
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link className="nav-link about-link">Home</Nav.Link>
              </LinkContainer>
              {isLoggedIn ? (
                <>
                  {loginReducer.user.roles[0].roleName === "ADMIN" ? (
                    <LinkContainer to="/adminProfile">
                      <Nav.Link className="nav-link">
                        <FontAwesomeIcon icon={faUser} className="icon" /> {loginReducer.user.firstName}
                      </Nav.Link>
                    </LinkContainer>
                  ) : (
                    <LinkContainer to="/userProfile">
                      <Nav.Link className="nav-link">
                        <FontAwesomeIcon icon={faUser} className="icon" /> {loginReducer.user.firstName}
                      </Nav.Link>
                    </LinkContainer>
                  )}

                  <Nav.Link className="nav-link" onClick={showLogoutConfirmation}>
                    <FontAwesomeIcon icon={faPowerOff} className="icon" /> Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link className="nav-link">Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link className="nav-link">Register</Nav.Link>
                  </LinkContainer>
                </>
              )}

              <LinkContainer to="/about">
                <Nav.Link className="nav-link about-link">About Us</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
