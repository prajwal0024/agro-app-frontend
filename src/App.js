import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/authentication/LoginPage';
import SignupPage from './pages/authentication/SignupPage';

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Switch>
            <Route to="/" component={HomePage} />
            <Route to="/login" component={LoginPage} />
            <Route to="/signup" component={SignupPage} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
