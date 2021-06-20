import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/authentication/LoginPage';
import SignupPage from './pages/authentication/SignupPage';
import HomePage from './pages/HomePage/HomePage';
import CropPredictionPage from './pages/CropPrediction/CropPredictionPage';
import UserProductsPage from './pages/UserProducts/UserProductsPage';
import AccountSettingsPage from './pages/AccountSettings/AccountSettingsPage';
import MarketProductPage from './pages/MarketProduct/MarketProductPage';

import {
  ACCOUNT_SETTINGS_ROUTE,
  ADD_PRODUCT_PAGE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  MARKET_SINGLE_PRODUCT_PAGE,
  MY_PRODUCT_ROUTE,
  PREDICTION_ROUTE,
  SIGNUP_ROUTE,
  USER_SINGLE_PRODUCT_PAGE,
} from './constants/routes';
import axios from 'axios';
import { setUser } from './actions/authActions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { axiosResponseInterceptor } from './helpers/axiosInterceptor';
import NavBar from './components/NavBar/NavBar';
import { useTranslation } from 'react-i18next';
import Sidebar from './components/Sidebar/Sidebar';
import NotFound from './pages/NotFound/NotFound';
import UserSingleProductPage from './pages/UserSingleProduct/UserSingleProductPage';
import AddProductPage from './pages/AddProduct/AddProductPage';

function App() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  document.title = t('page_title');

  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [notLogin, setNotLogin] = useState(false);

  const retriveUser = async () => {
    try {
      // 1. Get Access Token
      const tokenRes = await axios.get('/api/v1/users/token');
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${tokenRes.data.accessToken}`;

      // 2. Get User
      if (tokenRes.data.accessToken) {
        const userRes = await axios.get('/api/v1/users/me');

        // 3. Save User
        dispatch(setUser({ ...userRes.data.data.user }));
      }
      setLoading(false);
    } catch (error) {
      setNotLogin(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    retriveUser();
  }, []);

  return loading ? (
    <p>loading</p>
  ) : (
    <>
      <Router>
        <div className="app">
          <NavBar />
          <ToastContainer />
          {notLogin ? (
            <Switch>
              <Route path={LOGIN_ROUTE} component={LoginPage} exact />
              <Route path={SIGNUP_ROUTE} component={SignupPage} exact />
            </Switch>
          ) : (
            <Switch>
              <Route path={LOGIN_ROUTE} component={LoginPage} exact />
              <Route path={SIGNUP_ROUTE} component={SignupPage} exact />
              <div className="app-container container">
                {showSidebar && <Sidebar />}
                <div className="app-main">
                  <Switch>
                    <Route path={HOME_ROUTE} component={HomePage} exact />
                    <Route
                      path={PREDICTION_ROUTE}
                      component={CropPredictionPage}
                      exact
                    />
                    <Route
                      path={MY_PRODUCT_ROUTE}
                      component={UserProductsPage}
                      exact
                    />
                    <Route
                      path={ACCOUNT_SETTINGS_ROUTE}
                      component={AccountSettingsPage}
                      exact
                    />
                    <Route
                      path={USER_SINGLE_PRODUCT_PAGE}
                      component={UserSingleProductPage}
                      exact
                    />
                    <Route
                      path={MARKET_SINGLE_PRODUCT_PAGE}
                      component={MarketProductPage}
                      exact
                    />
                    <Route
                      path={ADD_PRODUCT_PAGE}
                      component={AddProductPage}
                      exact
                    />
                    <Route
                      path="*"
                      component={() => (
                        <NotFound setShowSidebar={setShowSidebar} />
                      )}
                    />
                  </Switch>
                </div>
              </div>
            </Switch>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
