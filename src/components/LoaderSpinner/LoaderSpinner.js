import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const LoaderSpinner = () => (
  <div className="LoaderSpinner">
    <Loader type="Watch" color="#00BFFF" height={100} width={100} timeout={0} />
  </div>
);

export default LoaderSpinner;
