import './NotFound.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = ({ setShowSidebar }) => {
  const { t } = useTranslation();
  useEffect(() => {
    setShowSidebar(false);
    return () => setShowSidebar(true);
  }, []);

  return (
    <div className="notfound">
      <h1 className="notfound-heading">{t('notfound_heading')}</h1>
      <p className="notfound-message">{t('notfound_message')}</p>
      <Link to="/" className="notfound-link">
        {t('notfound_link')}
      </Link>
    </div>
  );
};

export default NotFound;
