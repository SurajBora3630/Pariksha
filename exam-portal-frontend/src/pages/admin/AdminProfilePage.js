import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "./AdminProfilePage.css";
import Image from "react-bootstrap/Image";
import { fetchCategories } from "../../actions/categoriesActions";
import { fetchQuizzes } from "../../actions/quizzesActions";
import { useLocation } from "react-router-dom";
import { MDBCard, MDBCardBody, MDBTable, MDBTableBody, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

const AdminProfilePage = () => {
  const [profilePicURL, setProfilePicURL] = useState(null);

  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user || {};

  useEffect(() => {
    if (user.profilePictureSrc) {
      setProfilePicURL(user.profilePictureSrc);
    }
  }, [user.profilePictureSrc]);

  const location = useLocation();
  const updatedUser = location.state && location.state.updatedUser;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    fetchCategories(dispatch, token);
  }, [dispatch]);

  useEffect(() => {
    fetchQuizzes(dispatch, token);
  }, [dispatch]);

  return (
    <div className="adminProfilePage__container">
      <Sidebar />
      <div className="adminProfilePage__content">
        <div className="adminProfilePage__content--profilePicContainer">
          <div className="adminProfilePage__content--profilePicFrame">
            <Image
              className="adminProfilePage__content--profilePic"
              width="100%"
              height="100%"
              roundedCircle
              src={profilePicURL || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}
              alt="Profile Picture"
            />
          </div>
        </div>

        <MDBCard className="mb-4" style={{ borderRadius: '15px', maxWidth: '500px', margin: '0 auto' }}>
          <MDBCardBody>
            <MDBTypography tag='h3' className="mb-3">{updatedUser?.firstName || user.firstName} {
                    updatedUser?.lastName || user.lastName
                  }</MDBTypography>
            <MDBTable borderless responsive>
              <MDBTableBody>
                <tr>
                  <td>Name</td>
                  <td>{`${updatedUser?.firstName || user.firstName} ${
                    updatedUser?.lastName || user.lastName
                  }`}</td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>{updatedUser?.username || user.username}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{updatedUser?.phoneNumber || user.phoneNumber}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>{user.roles[0].roleName}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{user.active ? "Active" : "Inactive"}</td>
                </tr>
              </MDBTableBody>
            </MDBTable>
            <Link
              to={{
                pathname: "/adminProfileUpdate",
                state: { initialData: user },
              }}
              className="update-profile-link"
            >
              Update Profile <MDBIcon fas icon="edit" className="ms-2" />
            </Link>
          </MDBCardBody>
        </MDBCard>
      </div>
    </div>
  );
};

export default AdminProfilePage;
