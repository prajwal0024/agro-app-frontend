/* eslint-disable no-unused-vars */
import ProductImageMissing from '../../assests/images/product-image-missing.jpg';
import UserImageMissing from '../../assests/images/user-profile.jpg';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import './MarketProduct.css';
import { timeDifference } from '../../helpers/dist';

const MarketProduct = ({
  name,
  price,
  perQuantity,
  totalQuantity,
  createdAt,
  userName,
  mainImage,
  link,
  state,
  block,
  userImage,
}) => {
  const { t } = useTranslation();

  return (
    <Link className="mp" to={link}>
      <div className="mp-img-container">
        <img
          src={mainImage || ProductImageMissing}
          alt="product"
          className="mp-img"
        />
      </div>

      <div className="mp-product-info">
        <div className="mp-info-container mp-info-span">
          <p className="mp-info-label">{t('product_name')}</p>
          <p className="mp-info">{name}</p>
        </div>

        <div className="mp-info-container">
          <p className="mp-info-label">
            {t('price')} ({t('per')} {perQuantity})
          </p>
          <p className="mp-info">Rs. {price}</p>
        </div>

        <div className="mp-info-container">
          <p className="mp-info-label">{t('total_quantity')}</p>
          <p className="mp-info">{totalQuantity}</p>
        </div>

        <div className="mp-info-container">
          <p className="mp-info-label">Area</p>
          <p className="mp-info">{block}</p>
        </div>

        <div className="mp-info-container">
          <p className="mp-info-label">State</p>
          <p className="mp-info">{state}</p>
        </div>

        {/* <div className="mp-info-container">
          <p className="mp-info-label">{t('date_uploaded')}</p>
          <p className="mp-info">{formatDate(createdAt)}</p>
        </div> */}

        {/* <div className="mp-info-container">
          <p className="mp-info-label">{t('posted_by')}</p>
          <p className="mp-info">{userName}</p>
        </div> */}
      </div>
      <hr className="mp-info-hr" />
      <div className="mp-info-user">
        <div className="mp-info-user-img-container">
          <img
            src={userImage || UserImageMissing}
            alt=""
            className="mp-info-user-img"
          />
        </div>
        <div className="mp-info-user-details">
          <p className="mp-info-user-name">{userName}</p>
          {/* <p className="mp-info-user-posted-at">{formatDate(createdAt)}</p> */}
          <p className="mp-info-user-posted-at">
            {timeDifference(new Date(), new Date(`${createdAt}`))}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MarketProduct;
