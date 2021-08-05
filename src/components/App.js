import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

import './App.module.css';

class App extends Component {
  state = {
    imageName: '',
    showLightbox: false,
    modalUrl: '',
    modalAlt: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  toggleLightbox = () => {
    this.setState(({ showLightbox }) => ({
      showLightbox: !showLightbox,
    }));
  };

  modalContent = (url, alt) => {
    this.setState({ modalUrl: url, modalAlt: alt });
  };

  render() {
    const { showLightbox } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          imageName={this.state.imageName}
          openModal={this.toggleLightbox}
          modalContent={this.modalContent}
        />

        {showLightbox && (
          <Modal onClose={this.toggleLightbox} modalContent={this.modalContent}>
            <img src={this.state.modalUrl} alt={this.state.modalAlt} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
