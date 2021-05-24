/* eslint-disable no-unused-vars */
import './UserSingleProductPage.css';
import { useTranslation } from 'react-i18next';
import InputFiled from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MY_PRODUCT_ROUTE } from '../../constants/routes';
import 'react-datepicker/dist/react-datepicker.css';

const UserSingleProductPage = ({ history }) => {
  const params = useParams();
  const { t } = useTranslation();
  const userStore = useSelector((state) => state.authReducer.user);
  const { id } = params;
  const [userInputs, setUserInputs] = useState({});
  const [userInputDate, setUserInputDate] = useState(new Date());

  const fetchProduct = async (productID) => {
    try {
      const response = await axios.get(`/api/v1/products/${productID}`);
      if (response.data.data.product.user.email !== userStore.email) {
        toast.error("You cannot edit other user's product");
        history.push(MY_PRODUCT_ROUTE);
        return;
      }

      setUserInputs({ ...response.data.data.product });
      setUserInputDate(
        new Date(response.data.data.product.harvestingDate)
          .toISOString()
          .substr(0, 10)
      );
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  const handleProductUpdate = async (e) => {
    e.preventDefault();

    const {
      name,
      price,
      perQuantity,
      totalQuantity,
      description,
      location,
      contact,
    } = userInputs;

    if (
      !name ||
      !price ||
      !perQuantity ||
      !totalQuantity ||
      !description ||
      !location ||
      !contact
    )
      return toast.error('Please fill all the inputs');

    try {
      const response = id
        ? await axios.patch(`/api/v1/products/${id}`, {
            name,
            price,
            perQuantity,
            totalQuantity,
            description,
            location,
            contact,
            harvestingDate: userInputDate,
          })
        : await axios.post(`/api/v1/products/user`, {
            name,
            price,
            perQuantity,
            totalQuantity,
            description,
            location,
            contact,
            harvestingDate: userInputDate,
          });

      toast.success('Product Update Successful');
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  const handleUserInputs = (e) => {
    const { id, value } = e.target;
    setUserInputs({ ...userInputs, [id]: value });
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  return (
    <div className="user-sing-prod">
      <div className="semi-container user-prod-sing-container">
        <h1 className="page-heading">{id ? 'Edit' : 'Add'} Product</h1>
        <form className="user-prod-sing-form" onSubmit={handleProductUpdate}>
          <div className="user-prod-sing-inputs-container">
            <InputFiled
              label="product name"
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              classes="user-sing-prod-span-input"
              value={userInputs.name}
              handleChange={handleUserInputs}
              id="name"
            />
            <InputFiled
              label="product price"
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              value={userInputs.price}
              handleChange={handleUserInputs}
              id="price"
            />
            <InputFiled
              label="price per quantity"
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              value={userInputs.perQuantity}
              handleChange={handleUserInputs}
              id="perQuantity"
            />
            <InputFiled
              label="total quantity"
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              value={userInputs.totalQuantity}
              handleChange={handleUserInputs}
              id="totalQuantity"
            />
            <InputFiled
              label="harvesting date"
              type="date"
              placeholder="DD/MM/YYYY"
              value={userInputDate}
              handleChange={(e) => setUserInputDate(e.target.value)}
              id="harvestingDate"
            />
            <InputFiled
              label="description"
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              classes="user-sing-prod-span-input"
              value={userInputs.description}
              handleChange={handleUserInputs}
              id="description"
            />
            <InputFiled
              label="contact"
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              value={userInputs.contact}
              handleChange={handleUserInputs}
              id="contact"
            />
            <InputFiled
              label="pin code"
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              value={userInputs.location}
              handleChange={handleUserInputs}
              id="location"
            />
          </div>
          <div className="user-prod-sing-button-container">
            <Button
              text={`${id ? 'Update' : 'Add'} Product`}
              classes="button-primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSingleProductPage;
