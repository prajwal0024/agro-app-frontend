/* eslint-disable no-unused-vars */
import './InputField.css';

import { ReactComponent as HidePassword } from '../../assests/icons/hide-password.svg';
import { ReactComponent as ShowPassword } from '../../assests/icons/show-password.svg';
import { useState } from 'react';

const Input = ({ label, type, placeholder, value, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="inputfield">
      <label className="inputfield-label">{label}</label>
      <input
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        className={`inputfield-input ${
          type === 'password' && 'inputfield-input-password'
        }`}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
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
