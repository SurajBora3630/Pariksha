import React, { useState } from "react";
import { Container, Row, Col, Image, Form, Button, Modal } from "react-bootstrap";
import "./AboutUsPage.css";

const AboutUsPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleSuccessModalShow = () => {
    setShowSuccessModal(true);
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  const handleErrorModalShow = () => {
    setShowErrorModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmissionStatus(data);
        if (data.success) {
          handleSuccessModalShow(); // Show the success modal
        } else {
          handleErrorModalShow(); // Show the error modal
        }
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
        handleErrorModalShow(); // Show the error modal on API call failure
      });
  };


  return (
    <div className="about-us-page">
      <Container>
        {/* Section Title */}
        <u> <h2 className="section-title">About Pariksha: Online Examination Portal</h2></u>

        <Row className="about">
          {/* Text Section */}
          <Col md={6}>
            {/* Text Section */}
            <div className="about-text">
              {/* ... (Previous code for about section) */}
              <p>
                Pariksha is a leading online examination portal that provides a
                user-friendly and efficient platform for students, teachers, and
                educational institutions. Our mission is to bridge the gap between
                education and technology, making the examination process seamless,
                transparent, and accessible to all.
              </p>
              <p>
                With Pariksha, students can take exams from the comfort of their
                homes, access study materials, and receive instant results. Our
                time management tools help students excel in their exams while
                educators can easily create and manage online assessments.
              </p>
              <p>
                Join Pariksha today and experience the future of online education.
              </p>
            {/* Creator Info */}
            <div className="about-creator">
              <u><h3 className="creator-title">About the Creator</h3></u>
                <p>
                  Pariksha: Online Examination Portal was created by Suraj Bora,
                  a student at Govind Ballabh Pant University of Agriculture and Technology.
                  You can reach Suraj via email at <a href="mailto:ssgksuraj@gmail.com">ssgksuraj@gmail.com</a>.
                </p>
              </div>
            </div>
          </Col>


          {/* Image Section */}
          <Col md={6}>
            <Image
              src="/images/pexels-william-fortunato-6392978.jpg"
              alt="About Us Image"
              className="about-image"
            />
          </Col>
        </Row>

        {/* Contact Us Section */}
        <section className="contact-us">
          <Row>
            {/* ... (Previous code for contact info) */}
            <Col md={6}>
      <div className="contact-info">
        <h3>Contact Information</h3>
        <p>Email: <a href="mailto:ssgksuraj@gmail.com">admin@gmail.com</a></p>
        <p>Phone: +91 9634432094</p>
        <p>Address: Rto road, Haldwani</p>
      </div>
    </Col>
  </Row>
</section>
      </Container>
    </div>
  );
};

export default AboutUsPage;
