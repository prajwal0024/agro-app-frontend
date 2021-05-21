import './Sidebar.css';
import UserProfileImage from '../../assests/images/user-profile.jpg';
import { ReactComponent as HomeIcon } from '../../assests/icons/home.svg';
import { ReactComponent as PlantIcon } from '../../assests/icons/crop.svg';
import { ReactComponent as MyProductIcon } from '../../assests/icons/my-product.svg';
import { ReactComponent as UserIcon } from '../../assests/icons/user.svg';
import { ReactComponent as LogoutIcon } from '../../assests/icons/logout.svg';

import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { logout } from '../../actions/authActions';
import { LOGIN_ROUTE } from '../../constants/routes';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
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
    <div className="home-sidebar">
      <div className="sidebar-user-container">
        <div className="sidebar-user-img-container">
          <img
            src={UserProfileImage}
            alt="user profile"
            className="sidebar-user-img"
          />
        </div>
        <p className="sidebar-user-name">User name</p>
        <p className="sidebar-user-info">User name</p>
      </div>
      <hr className="sidebar-hr" />
      <div className="sidebar-menu-container">
        <div className="sidebar-menu-item">
          <HomeIcon className="sidebar-menu-item-icon" />
          <p className="sidebar-menu-item-text">{t('sidebar_home')}</p>
        </div>

        <div className="sidebar-menu-item">
          <PlantIcon className="sidebar-menu-item-icon" />
          <p className="sidebar-menu-item-text">
            {t('sidebar_crop_prediction')}
          </p>
        </div>

        <div className="sidebar-menu-item">
          <MyProductIcon className="sidebar-menu-item-icon" />
          <p className="sidebar-menu-item-text">{t('sidebar_my_products')}</p>
        </div>

        <div className="sidebar-menu-item">
          <UserIcon className="sidebar-menu-item-icon" />
          <p className="sidebar-menu-item-text">
            {t('sidebar_account_settings')}
          </p>
        </div>

        <div
          className="sidebar-menu-item sidebar-menu-item-logout"
          onClick={handleLogout}
        >
          <LogoutIcon className="sidebar-menu-item-icon" />
          <p className="sidebar-menu-item-text">{t('logout')}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
