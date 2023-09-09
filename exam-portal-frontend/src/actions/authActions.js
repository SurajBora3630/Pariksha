import * as authConstants from "../constants/authConstants";
import authServices from "../services/authServices";
import axios from 'axios'; // Import the axios library
export const register = async (dispatch, user) => {
  dispatch({ type: authConstants.USER_REGISTER_REQUEST });
  const { isRegistered, error } = await authServices.register(user);
  if (isRegistered) {
    return dispatch({
      type: authConstants.USER_REGISTER_SUCCESS,
      payload: isRegistered,
    });
  } else {
    return dispatch({
      type: authConstants.USER_REGISTER_FAILURE,
      payload: error,
    });
  }
};

export const login = async (dispatch, username, password) => {
  dispatch({ type: authConstants.USER_LOGIN_REQUEST });
  const data = await authServices.login(username, password);
  if (data && data.user) {
    return dispatch({
      type: authConstants.USER_LOGIN_SUCCESS,
      payload: data.user,
    });
  } else {
    return dispatch({
      type: authConstants.USER_LOGIN_FAILURE,
      payload: data,
    });
  }
};

export const update = async (dispatch, user) => {
  dispatch({ type: authConstants.USER_REGISTER_REQUEST });
  const { isUpdated, error } = await authServices.update(user);
  if (isUpdated) {
    return dispatch({
      type: authConstants.USER_UPDATE_SUCCESS,
      payload: isUpdated,
    });
  } else {
    return dispatch({
      type: authConstants.USER_UPDATE_FAILURE,
      payload: error,
    });
  }
};

export const forgotPassword = async (dispatch, username) => {
  try {
    dispatch({ type: authConstants.FORGOT_PASSWORD_REQUEST });

    // Send a request to your backend API to initiate the password reset process
    const response = await axios.post('/api/forgot-password', { username });

    dispatch({ type: authConstants.FORGOT_PASSWORD_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: authConstants.FORGOT_PASSWORD_FAILURE, payload: error.message });
  }
};
export const logoutUser = () => (dispatch) => {
  // Clear user data from the Redux store
  dispatch({ type: 'LOGOUT_USER' });
};