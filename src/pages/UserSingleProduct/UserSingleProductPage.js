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
import ProductMissingImage from '../../assests/images/product-image-missing.jpg';
import ProductImageCropper from '../../components/ProductImageCropper/ProductImageCropper';

const UserSingleProductPage = ({ history }) => {
  const params = useParams();
  const { t } = useTranslation();
  const userStore = useSelector((state) => state.authReducer.user);
  const { id } = params;
  const [userInputs, setUserInputs] = useState({});
  const [userInputDate, setUserInputDate] = useState(new Date());
  const [productImage, setProductImage] = useState('');
  const [productCroppedImage, setProductCroppedImage] = useState('');
  const [axiosOtherImageLoading, setAxiosOtherImageLoading] = useState(false);
  const [productMainImage, setProductMainImage] = useState('');
  const [axiosMainImageLoading, setAxiosMainImageLoading] = useState(false);

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
      const areaCodeResponse = await axios.get(
        `https://thingproxy.freeboard.io/fetch/https://api.postalpincode.in/pincode/${location}`
      );
      if (areaCodeResponse.data[0].Status === 'Error') {
        return toast.error('Invalid Area Code');
      }

      const { District, State } = areaCodeResponse.data[0].PostOffice[0];

      await axios.patch(`/api/v1/products/${id}`, {
        name,
        price,
        perQuantity,
        totalQuantity,
        description,
        location,
        contact,
        harvestingDate: userInputDate,
        block: District,
        state: State,
      });

      toast.success(`Product ${id ? 'Update' : 'Added'} Successful`);
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  const handleUserInputs = (e) => {
    const { id, value } = e.target;
    setUserInputs({ ...userInputs, [id]: value });
  };

  const handleUploadImage = async () => {
    try {
      setAxiosOtherImageLoading(true);
      const res = await axios.post(`/api/v1/products/${id}/image`, {
        imageStr: productCroppedImage,
      });
      setProductImage(undefined);
      setUserInputs({
        ...userInputs,
        images: [...userInputs.images, res.data.data.imageUrl],
      });

      setAxiosOtherImageLoading(false);
      toast.success('Image Upload Successfull');
    } catch (error) {
      setAxiosOtherImageLoading(false);
      axiosErrorHandler(error);
    }
  };

  const handleRemoveProductImage = async (imageName) => {
    try {
      // 1. Send Request
      setAxiosOtherImageLoading(true);
      await axios.delete(`/api/v1/products/${id}/image`, {
        headers: {
          imagename: imageName,
        },
      });

      // 2. Delete Locally
      setAxiosOtherImageLoading(false);
      setUserInputs({
        ...userInputs,
        images: userInputs.images.filter((cur) => cur !== imageName),
      });

      // 3. Alert
      toast.success('Image Removed Successfully');
    } catch (error) {
      setAxiosOtherImageLoading(false);
      axiosErrorHandler(error);
    }
  };

  const handleUploadMainImage = async () => {
    try {
      setAxiosMainImageLoading(true);
      const res = await axios.post(`/api/v1/products/${id}/main-image`, {
        imageStr: productCroppedImage,
      });

      setAxiosMainImageLoading(false);
      setUserInputs.mainImage = res.data.data.imageUrl;
      setUserInputs({ ...userInputs, mainImage: res.data.data.imageUrl });

      setProductMainImage('');
      toast.success('Product main image uploaded');
    } catch (error) {
      setAxiosMainImageLoading(false);
      axiosErrorHandler(error);
    }
  };

  const handleRemoveMainImage = async () => {
    try {
      setAxiosMainImageLoading(true);
      const res = await axios.delete(`/api/v1/products/${id}/main-image`);

      setUserInputs({ ...userInputs, mainImage: '' });
      setAxiosMainImageLoading(false);

      toast.success('Main Image deleted successfully');
    } catch (error) {
      setAxiosMainImageLoading(false);
      axiosErrorHandler(error);
    }
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
          {/* Product's Main Image */}
          <h2 className="user-prod-sing-heading-secondary">
            Main Product Image
          </h2>
          <div className="user-prod-sing-main-img-section">
            {productMainImage ? (
              <ProductImageCropper
                image={productMainImage}
                setImage={setProductMainImage}
                setCroppedImage={setProductCroppedImage}
                handleUpload={handleUploadMainImage}
                axiosLoading={axiosMainImageLoading}
              />
            ) : (
              <div className="user-prod-sing-main-img-body">
                <div className="user-prod-sing-main-img-container">
                  <img
                    src={userInputs?.mainImage || ProductMissingImage}
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
                  {userInputs?.mainImage && (
                    <button
                      disabled={axiosMainImageLoading}
                      className="form-button form-button-reject"
                      type="button"
                      onClick={handleRemoveMainImage}
                    >
                      {axiosMainImageLoading ? 'Removing...' : 'Remove Image'}
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
            {productImage ? (
              <>
                <ProductImageCropper
                  image={productImage}
                  setImage={setProductImage}
                  setCroppedImage={setProductCroppedImage}
                  handleUpload={handleUploadImage}
                  axiosLoading={axiosOtherImageLoading}
                />
              </>
            ) : (
              <>
                {userInputs?.images?.map((image, index) => (
                  <>
                    <div className="user-prod-sing-image-container" key={index}>
                      <img
                        className="user-prod-sing-image"
                        src={image || ProductMissingImage}
                      />

                      <div className="user-prod-sing-image-buttons">
                        <button
                          disabled={axiosOtherImageLoading}
                          className="user-prod-sing-image-remove"
                          type="button"
                          onClick={() => handleRemoveProductImage(image)}
                        >
                          {axiosOtherImageLoading
                            ? 'Removing...'
                            : 'Remove Image'}
                        </button>
                      </div>
                    </div>
                  </>
                ))}
                {userInputs?.images?.length < 3 && (
                  <div className="user-prod-sing-add-image">
                    <label htmlFor="product-image-upload">Add Image</label>
                    <input
                      style={{ display: 'none' }}
                      type="file"
                      accept="image/*"
                      id="product-image-upload"
                      className="image-upload-input"
                      onChange={(e) => {
                        setProductImage(URL.createObjectURL(e.target.files[0]));
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
