"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line no-unused-vars
var axiosResponseInterceptor = _axios["default"].interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // console.log('ERRORRR', { e: error });
  if (error.response.data.message && error.response.data.message.includes('jwt expired')) {
    return _axios["default"].get('/api/v1/users/token').then(function (res) {
      _axios["default"].defaults.headers.common['Authorization'] = "Bearer ".concat(res.data.accessToken);
      error.response.config.headers['Authorization'] = "Bearer ".concat(res.data.accessToken);
      return (0, _axios["default"])(error.response.config);
    })["catch"](function (error) {
      return Promise.reject(error);
    });
  }

  return Promise.reject(error);
});