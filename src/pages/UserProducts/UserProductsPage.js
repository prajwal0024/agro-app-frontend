/* eslint-disable no-unused-vars */
import './UserProductsPage.css';
import { Link } from 'react-router-dom';
import { ReactComponent as EmptyListingIllustration } from '../../assests/illustration/empty-listing.svg';
import { useEffect, useState } from 'react';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';
import axios from 'axios';
import UserListing from '../../components/UserListing/UserListing';
import { USER_SINGLE_PRODUCT_PAGE } from '../../constants/routes';

const UserProductsPage = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [axiosLoading, setAxiosLoading] = useState(true);

  const fetchUserProducts = async () => {
    setAxiosLoading(true);
    try {
      const response = await axios.get('/api/v1/products/user');
      setUserProducts([...response.data.data.products]);
      setAxiosLoading(false);
    } catch (error) {
      setAxiosLoading(false);
      axiosErrorHandler(error);
    }
  };
  useEffect(() => {
    fetchUserProducts();
  }, []);
  return (
    <div className="user-product">
      <div className="semi-container user-prod-container">
        {axiosLoading ? (
          <div className="user-prod-empty-container">
            <p className="user-prod-empty-message">Loading... Please wait...</p>
          </div>
        ) : (
          <>
            <h1 className="page-heading">My Products</h1>
            {userProducts.length ? (
              <div className="user-prod-products-container">
                {userProducts.map((product, index) => {
                  const {
                    name,
                    price,
                    perQuantity,
                    totalQuantity,
                    location,
                    createdAt,
                  } = product;
                  return (
                    <div key={index}>
                      {' '}
                      <UserListing
                        key={index}
                        name={name}
                        price={price}
                        perQuantity={perQuantity}
                        totalQuantity={totalQuantity}
                        location={location}
                        createdAt={createdAt}
                        link={`/user/product/${product._id}`}
                      />
                    </div>
                  );
                })}
                <Link
                  to="/user/product"
                  className="user-prod-products-add-link"
                >
                  Add Product
                </Link>
              </div>
            ) : (
              <div className="user-prod-empty-container">
                <EmptyListingIllustration className="user-prod-empty-illustration" />
                <p className="user-prod-empty-message">
                  You do not have any products listed, click add product button
                  to create new listing.
                </p>
                <Link to="/user/product" className="user-prod-empty-link">
                  Add Product
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProductsPage;
