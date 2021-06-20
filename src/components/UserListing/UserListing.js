import './UserListing.css';
import ProductImageMissing from '../../assests/images/product-image-missing.jpg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../helpers/dist';
const UserListing = ({
  name,
  price,
  perQuantity,
  totalQuantity,
  location,
  createdAt,
  link,
  mainImage,
}) => {
  const { t } = useTranslation();

  return (
    <div className="upl">
      <div className="upl-img-container">
        <img
          src={mainImage || ProductImageMissing}
          alt="product"
          className="upl-img"
        />
      </div>

      <div className="upl-info-container">
        <p className="upl-info-label">{t('product_name')}</p>
        <p className="upl-info">{name}</p>
      </div>

      <div className="upl-info-container">
        <p className="upl-info-label">
          {t('price')} ({t('per')} {perQuantity})
        </p>
        <p className="upl-info">Rs. {price}</p>
      </div>

      <div className="upl-info-container">
        <p className="upl-info-label">{t('date_uploaded')}</p>
        <p className="upl-info">{formatDate(createdAt)}</p>
      </div>

      <div className="upl-info-container">
        <p className="upl-info-label">{t('pincode')}</p>
        <p className="upl-info">{location}</p>
      </div>

      <div className="upl-info-container">
        <p className="upl-info-label">{t('total_quantity')}</p>
        <p className="upl-info">{totalQuantity}</p>
      </div>
      <Link className="upl-link" to={link}>
        {t('edit_product')}
      </Link>
    </div>
  );
};

export default UserListing;
