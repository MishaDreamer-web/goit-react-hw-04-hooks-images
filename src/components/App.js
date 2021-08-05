import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

import './App.module.css';

function App() {
  const [imageName, setImageName] = useState('');
  const [showLightBox, setShowLightBox] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalArt, setModalArt] = useState('');

  const toggleLightbox = () => {
    setShowLightBox(showLightbox => !showLightbox);
  };

  const modalContent = (url, alt) => {
    setModalUrl(url);
    setModalArt(alt);
  };

  return (
    <>
      <Searchbar onSubmit={setImageName} />
      <ImageGallery
        imageName={imageName}
        openModal={toggleLightbox}
        modalContent={modalContent}
      />

      {showLightBox && (
        <Modal onClose={toggleLightbox} modalContent={modalContent}>
          <img src={modalUrl} alt={modalArt} />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
