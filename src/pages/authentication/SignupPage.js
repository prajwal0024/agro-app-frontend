import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUser } from '../../actions/authActions';
import Button from '../../components/Button/Button';
import Input from '../../components/InputField/InputField';
import { LOGIN_ROUTE } from '../../constants/routes';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';

const SignupPage = ({ history }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userStore = useSelector((state) => state.authReducer.user);
  const [userInputs, setUserInputs] = useState({});

  if (userStore && Object.keys(userStore).length > 0) history.push('/');

  const handleSignup = async (e) => {
    e.preventDefault();
    // 1. Check all inputs
    const { email, password, passwordConfirm } = userInputs;

    if (!email || !password || !passwordConfirm)
      return toast.error(t('toast_fill_all_inputs'));

    if (password.length < 8)
      return toast.error(t('signup_toast_password_short'));

    if (password !== passwordConfirm)
      return toast.error(t('signup_toast_password_not_match'));

    try {
      // 2. Send Request
      const response = await axios.post('/api/v1/users/signup', {
        email,
        password,
        passwordConfirm,
      });

      // 3. Set Header
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.accessToken}`;

      // 4. Set User
      dispatch(setUser({ email: response.data.data.user.email }));

      // 5. Redirect
      history.push('/');
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  const handleUserInputs = (e) => {
    const { id, value } = e.target;
    setUserInputs({ ...userInputs, [id]: value });
  };

  return (
    <div className="auth">
      <h1 className="auth-heading">{t('signup_heading')}</h1>
      <p className="auth-paragraph">{t('signup_para')}</p>
      <form onSubmit={handleSignup}>
        <Input
          label={t('email')}
          placeholder={t('email_placeholder')}
          type="text"
          value={userInputs.email}
          handleChange={handleUserInputs}
          id="email"
        />
        <Input
          label={t('password')}
          placeholder={t('password_placeholder')}
          type="password"
          value={userInputs.password}
          handleChange={handleUserInputs}
          id="password"
        />
        <Input
          label={t('confirm_password')}
          placeholder={t('confirm_password_placeholder')}
          type="password"
          value={userInputs.passwordConfirm}
          handleChange={handleUserInputs}
          id="passwordConfirm"
        />

        <Button
          text={t('create_account')}
          handleClick={handleSignup}
          classes="button-primary"
        />
        <Link to={LOGIN_ROUTE} className="auth-link">
          {t('signup_link_to_login')}
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
