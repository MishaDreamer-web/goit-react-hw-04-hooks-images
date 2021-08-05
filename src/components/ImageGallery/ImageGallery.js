import React, { Component } from 'react';
import { toast } from 'react-toastify';

import ImagesApiService from '../../ApiService/ApiService';
import ImageGalleryItem from '../ImageGalleryItem';
import Loader from '../LoaderSpinner';
import Button from '../Button/Button';

import styles from './ImageGallery.module.css';

import PropTypes from 'prop-types';

const imagesApiService = new ImagesApiService();

export default class ImageGallery extends Component {
  static propTypes = {
    openModal: PropTypes.func.isRequired,
    modalContent: PropTypes.func.isRequired,
    imageName: PropTypes.string.isRequired,
  };

  state = {
    images: null,
    laoding: false,
    error: null,
    status: 'idle',
    moreImage: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      // console.log('change image name');

      this.setState({ status: 'pending' });

      imagesApiService.query = this.props.imageName;
      imagesApiService
        .fetchImagesApi()
        .then(image => {
          if (image.length === 0) {
            toast.warning(
              `Sorry, on your request ${this.props.imageName} no results were found.`,
              {
                position: 'top-right',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              },
            );
            this.setState({
              error: `Sorry, on your request ${this.props.imageName} no results were found.`,
              loading: true,
              status: 'rejected',
            });
            return;
          } else {
            this.setState({
              images: image,
              status: 'resolved',
              loading: true,
              moreImage: true,
            });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleButtonClick = () => {
    const scrollTo = document.documentElement.scrollHeight - 141;
    imagesApiService
      .fetchImagesApi()
      .then(image => {
        this.setState(prevState => ({
          loading: !prevState.loading,
          images: [...prevState.images, ...image],
        }));
        window.scrollTo({
          top: scrollTo,
          behavior: 'smooth',
        });
        if (image.length < 12) {
          this.setState({ moreImage: false });
        }
      })
      .finally(
        this.setState(prevState => ({
          loading: !prevState.loading,
        })),
      );
  };

  render() {
    const { images, status, loading, moreImage } = this.state;
    // const { imageName } = this.props;

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
              openModal={this.props.openModal}
              modalContent={this.props.modalContent}
            />
          </ul>
          {moreImage ? (
            <>
              {loading ? (
                <Button onClick={this.handleButtonClick}>Load more</Button>
              ) : (
                <Loader />
              )}
            </>
          ) : null}
        </>
      );
    }
  }
}

// ImageGallery.propTypes = {
//   images: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//     }),
//   ).isRequired,
//   onClickImg: PropTypes.func.isRequired,
// };

// export default ImageGallery;
