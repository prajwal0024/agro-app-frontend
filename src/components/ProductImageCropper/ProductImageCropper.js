import React from 'react';
import './ProductImageCropper.css';

import ImageCropper from '../ImageCropper/ImageCropper';

const ProductImageCropper = ({
  image,
  setImage,
  setCroppedImage,
  handleUpload,

  axiosLoading,
}) => {
  return (
    <div className="product-cropper-container">
      <ImageCropper
        srcImage={image}
        setCropImage={setCroppedImage}
        percent={90}
      />
      <div className="product-cropper-buttons">
        {axiosLoading ? (
          <p>Uploading...</p>
        ) : (
          <>
            <button
              className="form-button form-button-accept"
              type="button"
              onClick={handleUpload}
            >
              Upload Image
            </button>
            <button
              className="form-button form-button-reject"
              type="button"
              onClick={() => {
                setImage(false);
              }}
            >
              Remove Image
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductImageCropper;
