import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/authentication/LoginPage';
import SignupPage from './pages/authentication/SignupPage';
import { HOME_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE } from './constants/routes';
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

function App() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  document.title = t('page_title');

  const [loading, setLoading] = useState(true);

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
        const { user } = userRes.data.data;

        // 3. Save User
        dispatch(setUser({ email: user.email }));
      }
      setLoading(false);
    } catch (error) {
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
          <Switch>
            <Route path={LOGIN_ROUTE} component={LoginPage} />
            <Route path={SIGNUP_ROUTE} component={SignupPage} />
            <div className="app-container">
              <Sidebar />
              <div className="app-main">
                <Route path={HOME_ROUTE} exact component={HomePage} />
              </div>
            </div>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
