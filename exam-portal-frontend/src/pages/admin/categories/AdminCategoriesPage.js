import React, { useEffect, useState } from "react";
import "./AdminCategoriesPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import * as categoriesConstants from "../../../constants/categoriesConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Sidebar from "../../../components/Sidebar";
import {
  deleteCategory,
  fetchCategories,
} from "../../../actions/categoriesActions";
import swal from "sweetalert";

const AdminCategoriesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const [categories, setCategories] = useState(categoriesReducer.categories);

  const categoryClickHandler = (catId) => {
    navigate(`/adminQuizzes/?catId=${catId}`);
  };

  const addNewCategoryHandler = () => {
    navigate("/adminAddCategory");
  };

  const updateCategoryHandler = (event, category) => {
    event.stopPropagation();
    navigate(`/adminUpdateCategory/${category.catId}/`);
  };

  const deleteCategoryHandler = (event, category) => {
    event.stopPropagation();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCategory(dispatch, category.catId, token).then((data) => {
          if (data.type === categoriesConstants.DELETE_CATEGORY_SUCCESS) {
            swal(
              "Category Deleted!",
              `${category.title} succesfully deleted`,
              "success"
            );
          } else {
            swal(
              "Category Not Deleted!",
              `${category.title} not deleted`,
              "error"
            );
          }
        });
      } else {
        swal(`${category.title} is safe`);
      }
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories(dispatch, token).then((data) => {
        setCategories(data.payload);
      });
    }
  }, []);
  return (
    <div className="adminCategoriesPage__container">
      <div className="adminCategoriesPage__sidebar">
        <Sidebar />
      </div>
      <div className="adminCategoriesPage__content">
        <h2 className="adminCategoriesPage__content--heading">Categories</h2>
        <div className="adminCategoriesPage__content--categoriesGrid">
          {categories ? (
            categories.length === 0 ? (
              <Message className="adminCategoriesPage__content--message">
                No categories are present. Try adding some categories.
              </Message>
            ) : (
              <div className="adminCategoriesPage__content--categoriesList">
                {categories.map((cat, index) => (
                  <div
                    key={index}
                    className="adminCategoriesPage__content--categoryCard"
                  >
                    <div className="adminCategoriesPage__content--categoryTitle">
                      {cat.title}
                    </div>
                    <div className="adminCategoriesPage__content--categoryDescription">
                      {cat.description}
                    </div>
                    <div className="adminCategoriesPage__content--categoryButtons">
                      <div
                        onClick={(event) => updateCategoryHandler(event, cat)}
                        className="adminCategoriesPage__content--categoryButton"
                      >
                        Update
                      </div>
                      <div
                        onClick={(event) => deleteCategoryHandler(event, cat)}
                        className="adminCategoriesPage__content--categoryButton"
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <Loader />
          )}
        </div>
        <Button
          variant="success"
          className="adminCategoriesPage__content--addButton"
          onClick={addNewCategoryHandler}
        >
          Add Category
        </Button>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;