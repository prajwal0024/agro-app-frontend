import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SIGNUP_ROUTE } from '../../constants/routes';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './authentication.css';
import { setUser } from '../../actions/authActions';
import Input from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

const LoginPage = ({ history }) => {
  const { t } = useTranslation();
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
      const { email, firstName, lastName, phone, areaCode, farmSize } =
        res.data.data.user;

      dispatch(
        setUser({ email, firstName, lastName, phone, areaCode, farmSize })
      );

      // dispatch(setUser({ email: res.data.data.user.email }));

      // 4. Redirect
      history.push('/');
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  return (
    <div className="auth">
      <h1 className="auth-heading">{t('login_heading')}</h1>
      <p className="auth-paragraph">{t('login_para')}</p>
      <form onSubmit={handleLogin}>
        <Input
          label={t('email')}
          placeholder={t('email_placeholder')}
          type="text"
          value={emailInput}
          handleChange={(e) => setEmailInput(e.target.value)}
        />
        <Input
          label={t('password')}
          placeholder={t('password_placeholder')}
          type="password"
          value={passowrdlInput}
          handleChange={(e) => setPassowrdlInput(e.target.value)}
        />
        <Button
          text={t('login')}
          handleClick={handleLogin}
          classes="button-primary"
        />
        <Link to={SIGNUP_ROUTE} className="auth-link">
          {t('login_link_to_signup')}
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
