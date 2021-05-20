/* eslint-disable no-console */
import { toast } from 'react-toastify';
const axiosErrorHandler = (error) => {
  console.log({ error });
  const errstr =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message === 'Request failed with status code 500'
      ? 'Server Error, try again later'
      : error.message;

  toast.error(errstr);
};

export default axiosErrorHandler;
