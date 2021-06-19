import ProductImage from '../../assests/images/product-image-missing.jpg';
import { useTranslation } from 'react-i18next';

const MarketProduct = ({
  name,
  price,
  perQuantity,
  totalQuantity,
  location,
  createdAt,
  userName,
  mainImage,
}) => {
  const { t } = useTranslation();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const formatDate = (dateString) => {
    const dateArray = dateString.split('T')[0].split('-');
    return `${dateArray[2]} ${months[parseInt(dateArray[1])]} ${dateArray[0]}`;
  };
  return (
    <div className="upl">
      <div className="upl-img-container">
        <img
          src={mainImage || ProductImage}
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

      <div className="upl-info-container">
        <p className="upl-info-label">{t('posted_by')}</p>
        <p className="upl-info">{userName}</p>
      </div>
    </div>
  );
};

export default MarketProduct;
