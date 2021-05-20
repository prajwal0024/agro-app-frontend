import './HomePage.css';
import { useSelector } from 'react-redux';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';
import axios from 'axios';
import { useState } from 'react';

const HomePage = ({ history }) => {
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

  return (
    <div className="auth">
      <h1>Home</h1>
      {userId && <h4>USER ID: {userId}</h4>}
      <button onClick={handleGetMe}>Get Me</button>
      <button onClick={() => setUserId()}>Clear</button>
      <button>Logout</button>
    </div>
  );
};

export default HomePage;
