import React, { useEffect, useState } from 'react';
import './NavBar.css';
import Logo from '../../assests/logo.png';
import { ReactComponent as TranslationIcon } from '../../assests/icons/translation.svg';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const languages = [
    {
      lang: 'english',
      code: 'en',
    },
    {
      lang: 'हिंदी',
      code: 'hi',
    },
  ];

  const { t } = useTranslation();
  const [navLang, setNavLang] = useState('English');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    document.title = t('page_title');
  }, [navLang]);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <img src={Logo} alt="logo" className="navbar-img" />
        <div
          className="navbar-lang-container"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <TranslationIcon className="navbar-lang-icon" />
          <div className="navbar-seprator" />
          <p className="navbar-lang noselect">{navLang}</p>
          {showDropdown && (
            <div className="navbar-dropdown">
              {languages.map((lang, index) => (
                <p
                  key={index}
                  className="navbar-dropdown-item"
                  onClick={() => {
                    i18next.changeLanguage(lang.code);
                    setNavLang(lang.lang);
                  }}
                >
                  {lang.lang}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
