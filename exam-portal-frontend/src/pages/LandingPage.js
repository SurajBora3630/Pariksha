import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./LandingPage.css"; // Add the CSS file for styling
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

const LandingPage = () => {
  const sendEmail = () => {
    const userEmail = document.getElementById('contact-email').value;
    const adminEmail = 'www.admin@gmail.com'; // Replace with your admin's email
  
    // Send the email (You may use an email service/library)
    // For simplicity, we'll just log the email here
    console.log(`User Email: ${userEmail}`);
    console.log(`Admin Email: ${adminEmail}`);
    alert('You are now a subscriber!');
  
    // You can implement the email sending logic using a backend service.
    // For example, you can use the 'nodemailer' library in a Node.js backend to send emails.
  };
  
  return (
    <div className="landing-page">
      {/* Header Section */}
      <MDBCarousel showControls showIndicators dark fade>
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={1}
          src='/images/pexels-katerina-holmes-5905702.jpg'
          alt='...'
        >
          <h1 className="heading-colosal">Pariksha: Online Examination Portal</h1>
          
        </MDBCarouselItem>
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={2}
          src='/images/colosal2.jpg'
          alt='...'
        >
          <h1 className="heading-colosal">Pariksha: Online Examination Portal</h1>
        </MDBCarouselItem>

        <MDBCarouselItem
          className='w-100 d-block'
          itemId={3}
          src='/images/colosal3.jpg'
        >
          <h1 className="heading-colosal">Pariksha: Online Examination Portal</h1>
        </MDBCarouselItem>
      </MDBCarousel>
     {/* Features Section */}


  {/* Updated CTA Section */}
<section className="cta">
  <Container>
    <h2>Ready to Get Started?</h2>
    <div className="cta-buttons">
      <Button variant="success" as={Link} to="/register">
        <i className="fas fa-user-plus"></i> Register Now
      </Button>
      <span className="cta-button-space"></span> {/* Add spacing between buttons */}
      <Button variant="danger" as={Link} to="/login">
        <i className="fas fa-sign-in-alt"></i> Login
      </Button>
    </div>
  </Container>
</section>

<section className="features">
  <Container>
    <h2 className="section-title">Key Features</h2>
    <Row>
      <Col md={4}>
        <div className="feature">
          <i className="fas fa-check-circle fa-3x"></i>
          <h3>User-Friendly Interface</h3>
          <p>
            Intuitive and easy-to-navigate platform designed with your
            convenience in mind.
          </p>
        </div>
      </Col>
      <Col md={4}>
        <div className="feature">
          <i className="fas fa-clock fa-3x"></i>
          <h3>Time Management</h3>
          <p>
            Effective time management tools to help you excel in your exams and
            assessments.
          </p>
        </div>
      </Col>
      <Col md={4}>
        <div className="feature">
          <i className="fas fa-graduation-cap fa-3x"></i>
          <h3>Educational Content</h3>
          <p>
            Access a vast library of categories and quizzes
            to support your learning journey.
          </p>
        </div>
      </Col>
    </Row>
  </Container>
</section>
 {/* Updated About Section */}
<section className="about">
  <Container>
    <h2 className="about-title">About Pariksha: Online Examination Portal</h2>
    <p className="about-text">
      Pariksha is a leading online examination portal that provides a
      user-friendly and efficient platform for students, teachers, and
      educational institutions. Our mission is to bridge the gap between
      education and technology, making the examination process seamless,
      transparent, and accessible to all.
    </p>
    <p className="about-text">
      With Pariksha, students can take exams from the comfort of their
      homes, and receive instant results. Our
      time management tools help students excel in their exams while
      educators can easily create and manage online assessments.
    </p>
    <p className="about-text">
      Join Pariksha today and experience the future of online education.
    </p>
  </Container>
</section>
{/* Contact Us Section */}
<section className="contact">
</section>

    </div>
  );
};

export default LandingPage;
