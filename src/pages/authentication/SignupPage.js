import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/InputField/InputField';
import { LOGIN_ROUTE } from '../../constants/routes';

const SignupPage = ({ history }) => {
  const userStore = useSelector((state) => state.authReducer.user);

  if (userStore && Object.keys(userStore).length > 0) history.push('/');

  const handleSignup = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth">
      <h1 className="auth-heading">Login to your application</h1>
      <p className="auth-paragraph">
        Fill in the following details and click on Login Button
      </p>
      <form onSubmit={handleSignup}>
        <Input
          label="email"
          placeholder="enter your email"
          type="text"
          // value={emailInput}
          // handleChange={setEmailInput}
        />
        <Input
          label="password"
          placeholder="enter your password"
          type="password"
          // value={passowrdlInput}
          // handleChange={setPassowrdlInput}
        />
        <Input
          label="confirm password"
          placeholder="enter your confirm password"
          type="password"
          // value={passowrdlInput}
          // handleChange={setPassowrdlInput}
        />
        <Button
          text="create account"
          handleClick={handleSignup}
          classes="button-primary"
        />
        <Link to={LOGIN_ROUTE} className="auth-link">
          Already have an account? Click Here.
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
