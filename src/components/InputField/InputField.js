/* eslint-disable no-unused-vars */
import './InputField.css';

import { ReactComponent as HidePassword } from '../../assests/icons/hide-password.svg';
import { ReactComponent as ShowPassword } from '../../assests/icons/show-password.svg';
import { useState } from 'react';

const Input = ({
  id,
  label,
  type,
  placeholder,
  value,
  handleChange,
  disabled,
  pattern,
  classes,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`inputfield ${classes}`}>
      <label className="inputfield-label">{label}</label>
      <input
        id={id}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        className={`inputfield-input ${
          type === 'password' && 'inputfield-input-password'
        }`}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
      {type === 'password' && (
        <div
          className="inputfield-icon-container"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <HidePassword className="inputfield-icon" />
          ) : (
            <ShowPassword className="inputfield-icon" />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
