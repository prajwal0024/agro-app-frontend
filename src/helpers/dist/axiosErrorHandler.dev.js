"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactToastify = require("react-toastify");

/* eslint-disable no-console */
var axiosErrorHandler = function axiosErrorHandler(error) {
  console.log({
    error: error
  });
  var errstr = error.response && error.response.data.message ? error.response.data.message : error.message === 'Request failed with status code 500' ? 'Server Error, try again later' : error.message;

  _reactToastify.toast.error(errstr);
};

var _default = axiosErrorHandler;
exports["default"] = _default;