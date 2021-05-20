import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../constants/routes';

const SignupPage = ({ history }) => {
  const userStore = useSelector((state) => state.authReducer.user);

  if (userStore && Object.keys(userStore).length > 0) history.push('/');

  return (
    <div className="auth">
      <h1>Create Account</h1>
      <form>
        <input type="email" placeholder="enter email" />
        <input type="password" placeholder="enter password" />
        <input type="password" placeholder="confirm password" />
        <button>create account</button>
        <Link to={LOGIN_ROUTE}>Go to login</Link>
      </form>
    </div>
  );
};

export default SignupPage;
