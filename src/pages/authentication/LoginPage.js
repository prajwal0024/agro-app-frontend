import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SIGNUP_ROUTE } from '../../constants/routes';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';
import { useSelector, useDispatch } from 'react-redux';

import './authentication.css';
import { setUser } from '../../actions/authActions';

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState('');
  const [passowrdlInput, setPassowrdlInput] = useState('');

  const userStore = useSelector((state) => state.authReducer.user);

  if (userStore && Object.keys(userStore).length > 0) history.push('/');

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!emailInput || !passowrdlInput)
      return toast.error('Please fill all inputs');

    try {
      // 1. Send Request
      const res = await axios.post('/api/v1/users/login', {
        email: emailInput,
        password: passowrdlInput,
      });

      // 2. Set Header
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.accessToken}`;

      // 3. Set User
      dispatch(setUser({ email: res.data.data.user.email }));

      // 4. Redirect
      history.push('/');
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="enter email"
          onChange={(e) => setEmailInput(e.target.value)}
          value={emailInput}
        />
        <input
          type="password"
          placeholder="enter password"
          onChange={(e) => setPassowrdlInput(e.target.value)}
          value={passowrdlInput}
        />
        <button>login</button>
        <Link to={SIGNUP_ROUTE}>Go to signup</Link>
      </form>
    </div>
  );
};

export default LoginPage;
