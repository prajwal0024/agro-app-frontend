/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SIGNUP_ROUTE } from '../../constants/routes';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';
import { useSelector, useDispatch } from 'react-redux';

import './authentication.css';
import { setUser } from '../../actions/authActions';
import Input from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

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
      <h1 className="auth-heading">Login to your application</h1>
      <p className="auth-paragraph">
        Fill in the following details and click on Login Button
      </p>
      <form onSubmit={handleLogin}>
        <Input
          label="email"
          placeholder="enter your email"
          type="text"
          value={emailInput}
          handleChange={setEmailInput}
        />
        <Input
          label="password"
          placeholder="enter your password"
          type="password"
          value={passowrdlInput}
          handleChange={setPassowrdlInput}
        />
        <Button
          text="login"
          handleClick={handleLogin}
          classes="button-primary"
        />
        <Link to={SIGNUP_ROUTE} className="auth-link">
          Already have an account? Click Here.
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
