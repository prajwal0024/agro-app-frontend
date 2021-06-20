/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { logout } from '../actions/authActions';
import { LOGIN_ROUTE } from '../constants/routes';
import axiosErrorHandler from './axiosErrorHandler';

const handleLogout = async (dispatch, history) => {
  try {
    // 1. Clear refresh token
    await axios.delete('/api/v1/users/token');

    // 2. Clear Header
    axios.defaults.headers.common['Authorization'] = null;

    // 3. Clear user from memory
    await dispatch(logout());

    // 4. Redirect
    return <Redirect to={LOGIN_ROUTE} />;
  } catch (error) {
    axiosErrorHandler(error);
  }
};

export default handleLogout;
