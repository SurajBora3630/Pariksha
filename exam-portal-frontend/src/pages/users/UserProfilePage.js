import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { fetchCategories } from "../../actions/categoriesActions";
import { fetchQuizzes } from "../../actions/quizzesActions";
import SidebarUser from "../../components/SidebarUser";
import { LinkContainer } from "react-router-bootstrap";
import "./UserProfilePage.css";
import { useLocation } from "react-router-dom";
const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user || {};
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const location = useLocation();
  const updatedUser = location.state && location.state.updatedUser;
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
    <div className="userProfilePage__container">
      <div className="userProfilePage__sidebar">
        <SidebarUser />
      </div>
      {user && (
        <div className="userProfilePage__content">
          <div className="profile-header">
            <Image
              className="userProfilePage__content--profilePic"
              width={200}
              height={200}
              roundedCircle
              src="/images/profilePic.png"
            />
            <h2 className="profile-name">{updatedUser?.firstName || user.firstName} {
                    updatedUser?.lastName || user.lastName
                  }</h2>
          </div>

          <Table bordered className="userProfilePage__content--table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{`${updatedUser?.firstName || user.firstName} ${
                    updatedUser?.lastName || user.lastName
                  }`}</td>
              </tr>
              <tr>
                <th>Username</th>
                <td>{updatedUser?.username || user.username}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{updatedUser?.phoneNumber || user.phoneNumber}</td>
              </tr>
              <tr>
                <th>Role</th>
                <td>{user.roles[0].roleName}</td>
              </tr>
              <tr>
                <th>Account Status</th>
                <td>{`${user.enabled}`}</td>
              </tr>
            </tbody>
          </Table>
          <LinkContainer to="/userProfileUpdate" state={ user } >
          <Button variant="primary" className="update-profile-button" >
            Update Profile
          </Button>
          </LinkContainer>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
