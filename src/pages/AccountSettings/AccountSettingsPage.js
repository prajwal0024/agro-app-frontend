import './AccountSettingsPage.css';
import UserProfile from '../../assests/images/user-profile.jpg';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';
import axios from 'axios';
import { setUser } from '../../actions/authActions';
import handleLogout from '../../helpers/handleLogout';
import { ACCOUNT_SETTINGS_ROUTE, LOGIN_ROUTE } from '../../constants/routes';

const AccountSettingsPage = ({ history }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userStore = useSelector((state) => state.authReducer.user);
  const [userInputs, setUserInputs] = useState(
    userStore
      ? {
          firstName: userStore.firstName || '',
          lastName: userStore.lastName || '',
          phone: userStore.phone || '',
          areaCode: userStore.areaCode || '',
          farmSize: userStore.farmSize || '',
        }
      : {}
  );

  useEffect(() => {
    if (!userStore || Object.keys(userStore).length === 0) {
      history.push(LOGIN_ROUTE);
    }
    return () => {
      if (
        userStore &&
        Object.keys(userStore).length > 0 &&
        !userStore.areaCode
      ) {
        history.push(ACCOUNT_SETTINGS_ROUTE);
      }
    };
  }, []);

  const handleUserInputs = (e) => {
    const { id, value } = e.target;
    setUserInputs({ ...userInputs, [id]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // 1. Check all inputs are present
    if (
      !userInputs.firstName ||
      !userInputs.lastName ||
      !userInputs.phone ||
      !userInputs.areaCode ||
      !userInputs.farmSize
    )
      return toast.error(t('toast_fill_all_inputs'));

    try {
      // 2. Send Request
      const response = await axios.patch('/api/v1/users/me', {
        firstName: userInputs.firstName,
        lastName: userInputs.lastName,
        phone: userInputs.phone,
        areaCode: userInputs.areaCode,
        farmSize: userInputs.farmSize,
      });

      // 3. Set Userstore
      const { firstName, lastName, phone, areaCode, farmSize } =
        response.data.data.user;

      dispatch(setUser({ firstName, lastName, phone, areaCode, farmSize }));

      // 4. Send Alert
      toast.success(t('user_acc_toast_profile_update_success'));
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    // 1. Check all inputs are present
    const { passwordCurrent, password, passwordConfirm } = userInputs;

    if (!passwordCurrent || !password || !passwordConfirm)
      return toast.error(t('toast_fill_all_inputs'));

    // 2. Send Request
    try {
      await axios.post('/api/v1/users/me/change-password', {
        passwordCurrent,
        password,
        passwordConfirm,
      });

      toast.success(t('user_acc_toast_password_changed'));
      // 3. Logout
      toast.success(t('user_acc_toast_logout'));
      handleLogout(dispatch, history);
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  return (
    <div className="user-acc">
      <div className="semi-container user-acc-container">
        <h1 className="page-heading">
          {t('user_acc_heading_account_settings')}
        </h1>
        <div className="user-acc-profile-container">
          <div className="user-acc-profile-img-container">
            <img
              src={UserProfile}
              alt="user profile"
              className="user-acc-profile-img"
            />
          </div>
          <div className="user-acc-profile-buttons-container">
            <button className="user-acc-profile-button user-acc-profile-button-primary">
              {t('user_acc_button_change_photo')}
            </button>
            <button className="user-acc-profile-button user-acc-profile-button-secondary">
              {t('user_acc_button_remove_photo')}
            </button>
          </div>
        </div>
        {userStore && !userStore.areaCode && (
          <p className="alert">{t('user_acc_alert_1')}</p>
        )}
        <form className="user-acc-details" onSubmit={handleUpdateProfile}>
          <div className="user-acc-details-inputs-container">
            <InputField
              label={t('user_acc_label_first_name')}
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              value={userInputs.firstName}
              handleChange={handleUserInputs}
              id="firstName"
            />

            <InputField
              label={t('user_acc_label_last_name')}
              type="text"
              placeholder={t('user_acc_placeholder_last_name')}
              value={userInputs.lastName}
              handleChange={handleUserInputs}
              id="lastName"
            />

            <InputField
              label={t('email')}
              type="text"
              placeholder={t('email')}
              value={userStore ? userStore.email : ''}
              disabled
            />

            <InputField
              label={t('user_acc_label_phone_no')}
              type="text"
              placeholder={t('user_acc_placeholder_phone_no')}
              value={userInputs.phone}
              handleChange={handleUserInputs}
              id="phone"
            />

            <InputField
              label={t('user_acc_label_area_code')}
              type="text"
              placeholder={t('user_acc_placeholder_area_code')}
              value={userInputs.areaCode}
              handleChange={handleUserInputs}
              id="areaCode"
            />

            <InputField
              label={t('user_acc_label_farm_size')}
              type="text"
              placeholder={t('user_acc_placeholder_farm_size')}
              value={userInputs.farmSize}
              handleChange={handleUserInputs}
              id="farmSize"
            />
          </div>
          <div className="user-acc-button-container">
            <Button
              text={t('user_acc_button_update_profile')}
              classes="button-primary"
            />
          </div>
        </form>
        {/* Change Password */}
        <h1 className="page-heading">
          {t('user_acc_heading_change_password')}
        </h1>
        <p className="alert">{t('user_acc_alert_2')}</p>
        <form
          className="user-acc-chng-password-form"
          onSubmit={handlePasswordChange}
        >
          <div className="user-acc-chng-password-form-inputs-container">
            <InputField
              label={t('user_acc_label_current_password')}
              type="password"
              placeholder={t('user_acc_placeholder_current_password')}
              value={userInputs.passwordCurrent}
              handleChange={handleUserInputs}
              id="passwordCurrent"
            />

            <div />

            <InputField
              label={t('user_acc_label_new_password')}
              type="password"
              placeholder={t('user_acc_placeholder_new_password')}
              value={userInputs.password}
              handleChange={handleUserInputs}
              id="password"
            />

            <InputField
              label={t('user_acc_label_confirm_new_password')}
              type="password"
              placeholder={t('user_acc_placeholder_confirm_new_password')}
              value={userInputs.passwordConfirm}
              handleChange={handleUserInputs}
              id="passwordConfirm"
            />
            <div></div>
          </div>
          <div className="user-acc-button-container">
            <Button
              text={t('user_acc_button_change_password')}
              classes="button-primary"
              onClick={handlePasswordChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
