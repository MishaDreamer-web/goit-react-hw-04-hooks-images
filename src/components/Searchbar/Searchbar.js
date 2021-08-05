import React, { Component } from 'react';
// import { ImSearch } from 'react-icons';
import { toast, Zoom } from 'react-toastify';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { imageName } = this.state;
    // console.log(imageName);

    if (imageName.trim() === '') {
      return toast.warn('Enter your request', {
        position: 'top-center',
        transition: Zoom,
        style: {
          top: 80,
          textAlign: 'center',
          width: 290,
          margin: '0 auto',
        },
      });
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    const { imageName } = this.state;

    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchForm__button}>
            <span className={styles.SearchForm__button_label}>Search</span>
          </button>

          <input
            className={styles.SearchForm__input}
            type="text"
            value={imageName}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
}
