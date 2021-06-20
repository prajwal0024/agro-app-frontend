/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';
import './MarketProductPage.css';
import UserImageMissing from '../../assests/images/user-profile.jpg';
import ProductImageMissing from '../../assests/images/product-image-missing.jpg';
import { formatDate } from '../../helpers/dist';

const MarketProductPage = () => {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState({});
  const [axiosLoading, setAxiosLoading] = useState(false);

  const fetchProduct = async (id) => {
    try {
      setAxiosLoading(true);
      const res = await axios.get(`/api/v1/products/${id}`);
      setAxiosLoading(false);
      setProduct(res.data.data.product);
    } catch (error) {
      setAxiosLoading(false);
      axiosErrorHandler(error);
    }
  };

  useEffect(() => {
    fetchProduct(id);
  }, []);
  return (
    <div className="mp-page">
      <h1 className="page-heading">Market Product</h1>
      {axiosLoading ? (
        <p>loading...</p>
      ) : (
        <>
          <h2 className="user-prod-sing-heading-secondary">Product Images</h2>

          {/* Product Images */}
          <div className="mp-page-imgs">
            <div className="mp-page-img-container">
              <img
                src={product.mainImage || ProductImageMissing}
                alt="Product"
                className="mp-page-img"
              />
            </div>
            {product?.images?.map((img, index) => (
              <div className="mp-page-img-container" key="index">
                <img
                  src={img || ProductImageMissing}
                  alt="Product"
                  className="mp-page-img"
                />
              </div>
            ))}
          </div>

          {/* Product Information */}
          <h2 className="user-prod-sing-heading-secondary">
            Product Information
          </h2>
          <div className="mp-page-info-container">
            <div className="mp-page-info mp-page-grid-span">
              <p className="mp-page-label">Product Name</p>
              <p className="mp-page-data">{product.name || '-'}</p>
            </div>

            <div className="mp-page-info">
              <p className="mp-page-label">Product Price</p>
              <p className="mp-page-data">{product.price || '-'}</p>
            </div>

            <div className="mp-page-info">
              <p className="mp-page-label">Price per quantity</p>
              <p className="mp-page-data">{product.perQuantity || '-'}</p>
            </div>

            <div className="mp-page-info">
              <p className="mp-page-label">Total Quantity</p>
              <p className="mp-page-data">{product.totalQuantity || '-'}</p>
            </div>

            <div className="mp-page-info">
              <p className="mp-page-label">Harvesting Date</p>
              <p className="mp-page-data">
                {formatDate(product.harvestingDate) || '-'}
              </p>
            </div>

            <div className="mp-page-info mp-page-grid-span">
              <p className="mp-page-label">Description</p>
              <p className="mp-page-data">{product.description || '-'}</p>
            </div>

            <div className="mp-page-info">
              <p className="mp-page-label">Contact Number</p>
              <p className="mp-page-data">{product.contact || '-'}</p>
            </div>

            <div className="mp-page-info">
              <p className="mp-page-label">Area Code</p>
              <p className="mp-page-data">{product.location || '-'}</p>
            </div>

            <div className="mp-page-info">
              <p className="mp-page-label">Area</p>
              <p className="mp-page-data">{product.block || '-'}</p>
            </div>

            <div className="mp-page-info">
              <p className="mp-page-label">State</p>
              <p className="mp-page-data">{product.state || '-'}</p>
            </div>
          </div>

          {/* Post Information */}
          <h2 className="user-prod-sing-heading-secondary">Post Information</h2>
          <div className="mp-page-info-container">
            <div className="mp-page-info">
              <p className="mp-page-label">Posted At</p>
              <p className="mp-page-data">{formatDate(product.createdAt)}</p>
            </div>
            <div className="mp-page-info">
              <p className="mp-page-label">Last Updated At</p>
              <p className="mp-page-data">{formatDate(product.updatedAt)}</p>
            </div>
          </div>

          {/* User Information */}
          <h2 className="user-prod-sing-heading-secondary">Posted By</h2>

          <div className="mp-page-user">
            <div className="mp-page-user-img-container">
              <img
                src={product.user?.image || UserImageMissing}
                alt=""
                className="mp-page-user-img"
              />
            </div>
            <div className="mp-page-user-info">
              <p className="mp-page-user-name">
                {product.user?.firstName} {product.user?.lastName}
              </p>
              <p className="mp-page-user-phone">{product.user?.phone}</p>
              <p className="mp-page-user-email">{product.user?.email}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MarketProductPage;
