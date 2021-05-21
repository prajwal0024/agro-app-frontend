import React, { useEffect, useState } from 'react';
import './NavBar.css';
import LogoEn from '../../assests/logo-en.png';
import LogoHi from '../../assests/logo-hi.png';
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
  const [navLang, setNavLang] = useState('english');
  const [showDropdown, setShowDropdown] = useState(false);
  const [logo, setLogo] = useState(LogoEn);

  useEffect(() => {
    document.title = t('page_title');
    setLogo(navLang === 'english' ? LogoEn : LogoHi);
  }, [navLang]);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <img src={logo} alt="logo" className="navbar-img" />
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
