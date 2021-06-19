import React, { useEffect, useRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import './ImageCropper.css';

const ImageCropper = ({ srcImage, setCropImage, percent = 10 }) => {
  const imageRef = useRef();

  useEffect(() => {
    const cropper = new Cropper(imageRef.current, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = cropper
          .getCroppedCanvas()
          .toDataURL('image/jpeg', percent / 100);
        setCropImage(canvas);
      },
    });
  }, []);
  return (
    <div className="imagecropper">
      <div className="imagecropper-container">
        <img
          className="imagecropper-img"
          ref={imageRef}
          src={srcImage}
          alt="src"
        />
      </div>
    </div>
  );
};

export default ImageCropper;
