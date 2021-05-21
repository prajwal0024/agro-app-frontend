import './HomePage.css';
import { useSelector, useDispatch } from 'react-redux';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';
import axios from 'axios';
import { useState } from 'react';
import { logout } from '../../actions/authActions';
import { LOGIN_ROUTE } from '../../constants/routes';

const HomePage = ({ history }) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.authReducer.user);
  const [userId, setUserId] = useState();

  if (userStore && Object.keys(userStore).length === 0) history.push('/login');

  const handleGetMe = async () => {
    try {
      const response = await axios.get('/api/v1/users/me');
      setUserId(response.data.data.user._id);
    } catch (error) {
      axiosErrorHandler(error);
    }
  };
  const handleLogout = async () => {
    try {
      // 1. Clear refresh token
      await axios.delete('/api/v1/users/token');

      // 2. Clear Header
      axios.defaults.headers.common['Authorization'] = null;

      // 3. Clear user from memory
      dispatch(logout());

      // 4. Redirect
      history.push(LOGIN_ROUTE);
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  return (
    <div className="auth">
      <h1>Home</h1>
      {userId && <h4>USER ID: {userId}</h4>}
      <button onClick={handleGetMe}>Get Me</button>
      <button onClick={() => setUserId()}>Clear</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
