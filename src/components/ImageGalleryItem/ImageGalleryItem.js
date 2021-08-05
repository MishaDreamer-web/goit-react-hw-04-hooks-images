import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    openModal: PropTypes.func.isRequired,
    modalContent: PropTypes.func.isRequired,
  };

  onImageClick = e => {
    this.props.modalContent(e.target.dataset.url, e.target.alt);
    this.props.openModal();
  };

  render() {
    return (
      <>
        {this.props.image.map(({ webformatURL, tags, id, largeImageURL }) => {
          return (
            <li key={id} className={styles.ImageGalleryItem}>
              <img
                src={webformatURL}
                alt={tags}
                className={styles.ImageGalleryItem__image}
                data-url={largeImageURL}
                onClick={this.onImageClick}
              />
            </li>
          );
        })}
      </>
    );
  }
}
