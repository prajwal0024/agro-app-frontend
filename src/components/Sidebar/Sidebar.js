import './Sidebar.css';
import UserProfileImage from '../../assests/images/user-profile.jpg';
import { ReactComponent as HomeIcon } from '../../assests/icons/home.svg';
import { ReactComponent as PlantIcon } from '../../assests/icons/crop.svg';
import { ReactComponent as MyProductIcon } from '../../assests/icons/my-product.svg';
import { ReactComponent as UserIcon } from '../../assests/icons/user.svg';
import { ReactComponent as LogoutIcon } from '../../assests/icons/logout.svg';

import { useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import {
  ACCOUNT_SETTINGS_ROUTE,
  HOME_ROUTE,
  MY_PRODUCT_ROUTE,
  PREDICTION_ROUTE,
} from '../../constants/routes';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import handleLogout from '../../helpers/handleLogout';

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const { pathname } = useLocation();

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
        <Link
          to={HOME_ROUTE}
          className={`sidebar-menu-item ${
            pathname === '/' && 'sidebar-menu-item-active'
          }`}
        >
          <HomeIcon className="sidebar-menu-item-icon" />
          <p className="sidebar-menu-item-text">{t('sidebar_home')}</p>
        </Link>

        <Link
          to={PREDICTION_ROUTE}
          className={`sidebar-menu-item ${
            pathname === '/prediction' && 'sidebar-menu-item-active'
          }`}
        >
          <PlantIcon className="sidebar-menu-item-icon" />
          <p className="sidebar-menu-item-text">
            {t('sidebar_crop_prediction')}
          </p>
        </Link>

        <Link
          to={MY_PRODUCT_ROUTE}
          className={`sidebar-menu-item ${
            pathname === '/my/products' && 'sidebar-menu-item-active'
          }`}
        >
          <MyProductIcon className="sidebar-menu-item-icon" />
          <p className="sidebar-menu-item-text">{t('sidebar_my_products')}</p>
        </Link>

        <Link
          to={ACCOUNT_SETTINGS_ROUTE}
          className={`sidebar-menu-item ${
            pathname === '/my/settings' && 'sidebar-menu-item-active'
          }`}
        >
          <UserIcon className="sidebar-menu-item-icon" />
          <p className="sidebar-menu-item-text">
            {t('sidebar_account_settings')}
          </p>
        </Link>

        <Link
          className="sidebar-menu-item sidebar-menu-item-logout"
          onClick={() => handleLogout(dispatch, history)}
        >
          <LogoutIcon className="sidebar-menu-item-icon" />
          <p className="sidebar-menu-item-text">{t('logout')}</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
