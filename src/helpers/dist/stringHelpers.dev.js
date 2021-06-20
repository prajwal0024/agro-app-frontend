"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractProductName = void 0;

var extractProductName = function extractProductName(str) {
  return str.split('product-')[1].split('.')[0];
};

exports.extractProductName = extractProductName;