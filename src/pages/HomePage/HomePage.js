/* eslint-disable no-unused-vars */
import './HomePage.css';
import { useSelector } from 'react-redux';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';
import axios from 'axios';
import { useEffect, useState } from 'react';
import WeatherWidget from '../../components/WeatherWidget/WeatherWidget';
import { ACCOUNT_SETTINGS_ROUTE } from '../../constants/routes';
import MarketProduct from '../../components/MarketProduct/MarketProduct';
import Fetching from '../../components/Fetching/Fetching';

const HomePage = ({ history }) => {
  const userStore = useSelector((state) => state.authReducer.user);
  const [userId, setUserId] = useState();
  const [marketProducts, setMarketProducts] = useState([]);
  const [axiosLoading, setAxiosLoading] = useState(false);

  if (userStore && Object.keys(userStore).length === 0)
    return history.push('/login');
  if (!userStore.areaCode) {
    history.push(ACCOUNT_SETTINGS_ROUTE);
    return <></>;
  }

  // const handleGetMe = async () => {
  //   try {
  //     const response = await axios.get('/api/v1/users/me');
  //     setUserId(response.data.data.user._id);
  //   } catch (error) {
  //     axiosErrorHandler(error);
  //   }
  // };

  const fetchProducts = async () => {
    try {
      setAxiosLoading(true);
      const response = await axios.get('/api/v1/products');
      setMarketProducts(response.data.data.products);
      setAxiosLoading(false);
    } catch (error) {
      setAxiosLoading(false);
      axiosErrorHandler(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home">
      <div className="container home-container">
        <WeatherWidget />
        <h1 className="page-heading">Marketplace</h1>
        {axiosLoading ? (
          <Fetching text={'fetching_market_data'} svg="market" />
        ) : (
          marketProducts.map((product, index) => (
            <MarketProduct
              key={index}
              name={product.name}
              price={product.price}
              perQuantity={product.perQuantity}
              totalQuantity={product.totalQuantity}
              location={product.location}
              createdAt={product.createdAt}
              userName={
                product.user.email === userStore.email
                  ? 'YOU'
                  : `${product.user.firstName} ${product.user.lastName}`
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
