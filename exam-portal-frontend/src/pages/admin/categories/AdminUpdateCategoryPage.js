// AdminUpdateCategoryPage.js

import React, { useState } from "react";
import "./AdminUpdateCategoryPage.css";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import * as categoriesConstants from "../../../constants/categoriesConstants";
import FormContainer from "../../../components/FormContainer";
import Sidebar from "../../../components/Sidebar";
import { updateCategory } from "../../../actions/categoriesActions";
import { useNavigate } from "react-router-dom";

const AdminUpdateCategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const catId = params.catId;

  const oldCategory = useSelector((state) =>
    state.categoriesReducer.categories.find((cat) => cat.catId == catId)
  );
  const [title, setTitle] = useState(oldCategory ? oldCategory.title : "");
  const [description, setDescription] = useState(
    oldCategory ? oldCategory.description : ""
  );
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const submitHandler = (e) => {
    e.preventDefault();
    const category = { catId: catId, title: title, description: description };
    updateCategory(dispatch, category, token).then((data) => {
      if (data.type === categoriesConstants.UPDATE_CATEGORY_SUCCESS) {
        swal("Category Updated!", `${title} successfully updated`, "success");
      } else {
        swal("Category Not Updated!", `${title} not updated`, "error");
      }
    });
    navigate("/adminCategories");
  };

  return (
    <div className="adminUpdateCategoryPage__container">
      <div className="adminUpdateCategoryPage__sidebar">
        <Sidebar />
      </div>
      <div className="adminUpdateCategoryPage__content">
        <FormContainer>
          <h2 className="adminUpdateCategoryPage__content--heading">
            Update Category
          </h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter Category Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              className="adminUpdateCategoryPage__content--addButton" // Apply the style here
              type="submit"
              variant="success"
            >
              Update
            </Button>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

export default AdminUpdateCategoryPage;
