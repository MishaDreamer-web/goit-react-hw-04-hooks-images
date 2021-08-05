import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import ImagesApiService from '../../ApiService/ApiService';
import ImageGalleryItem from '../ImageGalleryItem';
import Loader from '../LoaderSpinner';
import Button from '../Button/Button';

import styles from './ImageGallery.module.css';

import PropTypes from 'prop-types';

const imagesApiService = new ImagesApiService();

export default function ImageGallery({ imageName, openModal, modalContent }) {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [moreImage, setMoreImage] = useState(true);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    imagesApiService.resetPage();
    setLoading(true);
    setStatus('pending');

    imagesApiService.query = imageName;
    imagesApiService
      .fetchImagesApi()
      .then(image => {
        if (image.length === 0) {
          toast.warning(
            `Sorry, on your request ${imageName} no results were found.`,
            {
              position: 'top-right',
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            },
          );
          setError(
            `Sorry, on your request ${imageName} no results were found.`,
          );
          setLoading(true);
          setStatus('rejected');

          return;
        } else {
          setImages(image);
          setStatus('resolved');
          setLoading(true);
          setMoreImage(true);
        }
      })
      .catch(error => setError(error), setStatus('rejected'));
  }, [imageName]);

  const handleButtonClick = () => {
    const scrollTo = document.documentElement.scrollHeight - 141;
    imagesApiService
      .fetchImagesApi()
      .then(image => {
        setImages(state => [...state, ...image]);
        setLoading(true);

        window.scrollTo({
          top: scrollTo,
          behavior: 'smooth',
        });

        if (image.length < 12) {
          setMoreImage(false);
        }
      })
      .finally(setLoading(false));
  };

  if (status === 'idle') {
    return (
      <div
        style={{
          textAlign: 'center',
          fontSize: '18px',
          marginTop: '20px',
        }}
      >
        Enter what picture you want to find
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Loader />
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <h2
        style={{
          textAlign: 'center',
        }}
      >
        No images found
      </h2>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={styles.ImageGallery}>
          <ImageGalleryItem
            image={images}
            openModal={openModal}
            modalContent={modalContent}
          />
        </ul>
        {moreImage ? (
          <>
            {loading ? (
              <Button onClick={handleButtonClick}>Load more</Button>
            ) : (
              <Loader />
            )}
          </>
        ) : null}
      </>
    );
  }
}

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  modalContent: PropTypes.func.isRequired,
  imageName: PropTypes.string.isRequired,
};

// ImageGallery.propTypes = {
//   images: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//     }),
//   ).isRequired,
//   onClickImg: PropTypes.func.isRequired,
// };

// export default ImageGallery;
