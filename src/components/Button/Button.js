import './Button.css';

const Button = ({ text, handleClick, classes = ['a'] }) => {
  return (
    <button className={`button ${classes}`} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
