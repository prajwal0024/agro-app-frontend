import axios from 'axios';

// eslint-disable-next-line no-unused-vars
const axiosResponseInterceptor = axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log('ERRORRR', { e: error });

    if (
      error.response.data.message &&
      error.response.data.message.includes('jwt expired')
    ) {
      return axios
        .get('/api/v1/users/token')
        .then((res) => {
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${res.data.accessToken}`;
          error.response.config.headers[
            'Authorization'
          ] = `Bearer ${res.data.accessToken}`;
          return axios(error.response.config);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }

    return Promise.reject(error);
  }
);
