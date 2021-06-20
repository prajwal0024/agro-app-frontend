/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './AddProductPage.css';
import axios from 'axios';
import ProductImageCropper from '../../components/ProductImageCropper/ProductImageCropper';
import ProductMissingImage from '../../assests/images/product-image-missing.jpg';
import InputField from '../../components/InputField/InputField';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';
import { toast } from 'react-toastify';
import { MY_PRODUCT_ROUTE } from '../../constants/routes';

const AddProductPage = ({ history }) => {
  const { t } = useTranslation();
  const [product, setProduct] = useState({
    images: [],
  });
  const [userInputDate, setUserInputDate] = useState(new Date());
  const [productMainImage, setProductMainImage] = useState('');
  const [productAdditionalImage, setProductAdditionalImage] = useState('');
  const [croppedImage, setCroppedImage] = useState('');
  const [axiosLoading, setAxiosLoading] = useState(false);

  const handleUserInputs = (e) => {
    const { id, value } = e.target;
    setProduct({ ...product, [id]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setAxiosLoading(true);
      const areaCodeResponse = await axios.get(
        `https://thingproxy.freeboard.io/fetch/https://api.postalpincode.in/pincode/${product.location}`
      );
      if (areaCodeResponse.data[0].Status === 'Error') {
        setAxiosLoading(false);
        return toast.error('Invalid Area Code');
      }

      const { District, State } = areaCodeResponse.data[0].PostOffice[0];

      await axios.post('/api/v1/products/user', {
        ...product,
        harvestingDate: userInputDate,
        block: District,
        state: State,
      });
      toast.success('Product Added Successfully');
      setAxiosLoading(false);
      history.push(MY_PRODUCT_ROUTE);
    } catch (error) {
      axiosErrorHandler(error);
      setAxiosLoading(false);
    }
  };

  return (
    <div className="user-sing-prod">
      <div className="semi-container user-prod-sing-container">
        <h1 className="page-heading">Add Product</h1>
        <form className="user-prod-sing-form" onSubmit={handleAddProduct}>
          {/* Product's Main Image */}
          <h2 className="user-prod-sing-heading-secondary">
            Main Product Image
          </h2>
          <div className="user-prod-sing-main-img-section">
            {productMainImage ? (
              <ProductImageCropper
                image={productMainImage}
                setImage={setProductMainImage}
                setCroppedImage={setCroppedImage}
                handleUpload={() => {
                  setProduct({ ...product, mainImage: croppedImage });
                  setProductMainImage('');
                }}
              />
            ) : (
              <div className="user-prod-sing-main-img-body">
                <div className="user-prod-sing-main-img-container">
                  <img
                    src={product?.mainImage || ProductMissingImage}
                    className="user-prod-sing-main-img"
                  />
                </div>
                <div className="user-prod-sing-cropper-buttons">
                  <label
                    htmlFor="product-main-image-upload"
                    className="form-button form-button-accept"
                  >
                    Upload Image
                  </label>
                  <input
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/*"
                    id="product-main-image-upload"
                    className="image-upload-input"
                    onChange={(e) => {
                      setProductMainImage(
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                  />
                  {product?.mainImage && (
                    <button
                      className="form-button form-button-reject"
                      type="button"
                      onClick={() => setProduct({ ...product, mainImage: '' })}
                    >
                      Remove Image
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Product's Other Images */}
          <h2 className="user-prod-sing-heading-secondary">
            Additional Product Images
          </h2>
          <div className="user-prod-sing-images-container">
            {productAdditionalImage ? (
              <>
                <ProductImageCropper
                  image={productAdditionalImage}
                  setImage={setProductAdditionalImage}
                  setCroppedImage={setCroppedImage}
                  handleUpload={() => {
                    setProduct({
                      ...product,
                      images: [...product.images, croppedImage],
                    });
                    setProductAdditionalImage('');
                    setCroppedImage('');
                  }}
                />
              </>
            ) : (
              <>
                {product?.images?.map((image, index) => (
                  <>
                    <div className="user-prod-sing-image-container" key={index}>
                      <img
                        className="user-prod-sing-image"
                        src={image || ProductMissingImage}
                      />

                      <div className="user-prod-sing-image-buttons">
                        <button
                          className="user-prod-sing-image-remove"
                          type="button"
                          onClick={() =>
                            setProduct({
                              ...product,
                              images: product.images.filter(
                                (cur) => cur !== image
                              ),
                            })
                          }
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  </>
                ))}
                {(product?.images?.length < 3 || !product.images) && (
                  <div className="user-prod-sing-add-image">
                    <label htmlFor="product-image-upload">Add Image</label>
                    <input
                      style={{ display: 'none' }}
                      type="file"
                      accept="image/*"
                      id="product-image-upload"
                      className="image-upload-input"
                      onChange={(e) => {
                        setProductAdditionalImage(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
          {/* Product's Information*/}
          <h2 className="user-prod-sing-heading-secondary">
            Product Information
          </h2>
          <div className="user-prod-sing-inputs-container">
            <InputField
              label="product name"
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              classes="user-sing-prod-span-input"
              value={product.name}
              handleChange={handleUserInputs}
              id="name"
            />
            <InputField
              label="product price"
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              value={product.price}
              handleChange={handleUserInputs}
              id="price"
            />
            <InputField
              label="price per quantity"
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              value={product.perQuantity}
              handleChange={handleUserInputs}
              id="perQuantity"
            />
            <InputField
              label="total quantity"
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              value={product.totalQuantity}
              handleChange={handleUserInputs}
              id="totalQuantity"
            />
            <InputField
              label="harvesting date"
              type="date"
              placeholder="DD/MM/YYYY"
              value={userInputDate}
              handleChange={(e) => setUserInputDate(e.target.value)}
              id="harvestingDate"
            />
            <InputField
              label="description"
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              classes="user-sing-prod-span-input"
              value={product.description}
              handleChange={handleUserInputs}
              id="description"
            />
            <InputField
              label="contact"
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              value={product.contact}
              handleChange={handleUserInputs}
              id="contact"
            />
            <InputField
              label="pin code"
              type="text"
              placeholder={t('user_acc_placeholder_first_name')}
              value={product.location}
              handleChange={handleUserInputs}
              id="location"
            />
          </div>
          <div className="user-prod-sing-button-container">
            <Button
              text={
                axiosLoading ? 'Saving Product, please wait..' : 'Add Product'
              }
              classes="button-primary"
              isDisabled={axiosLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
