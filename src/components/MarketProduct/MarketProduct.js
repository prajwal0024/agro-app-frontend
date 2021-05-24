import ProductImage from '../../assests/images/product-image-missing.jpg';
const MarketProduct = ({
  name,
  price,
  perQuantity,
  totalQuantity,
  location,
  createdAt,
  userName,
}) => {
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
        <img src={ProductImage} alt="product" className="upl-img" />
      </div>

      <div className="upl-info-container">
        <p className="upl-info-label">Product Name:</p>
        <p className="upl-info">{name}</p>
      </div>

      <div className="upl-info-container">
        <p className="upl-info-label">Price (per {perQuantity})</p>
        <p className="upl-info">Rs. {price}</p>
      </div>

      <div className="upl-info-container">
        <p className="upl-info-label">Date Uploaded</p>
        <p className="upl-info">{formatDate(createdAt)}</p>
      </div>

      <div className="upl-info-container">
        <p className="upl-info-label">PinCode</p>
        <p className="upl-info">{location}</p>
      </div>

      <div className="upl-info-container">
        <p className="upl-info-label">Total Quantity</p>
        <p className="upl-info">{totalQuantity}</p>
      </div>

      <div className="upl-info-container">
        <p className="upl-info-label">Posted By</p>
        <p className="upl-info">{userName}</p>
      </div>
    </div>
  );
};

export default MarketProduct;
