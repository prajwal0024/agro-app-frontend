import './Button.css';

const Button = ({ text, handleClick, isDisabled, classes = ['a'] }) => {
  return (
    <button
      className={`button ${classes}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
