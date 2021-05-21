import React from 'react';
import './NavBar.css';
import Logo from '../../assests/logo.png';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <img src={Logo} alt="logo" className="navbar-img" />
        <div className="navbar-lang-container">
          <p className="navbar-lang noselect">हिंदी</p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
