import React, { useEffect, useRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import './ImageCropper.css';

const ImageCropper = ({ srcImage, setCropImage }) => {
  const imageRef = useRef();

  useEffect(() => {
    const cropper = new Cropper(imageRef.current, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = cropper
          .getCroppedCanvas()
          .toDataURL('image/jpeg', 10 / 100);
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
