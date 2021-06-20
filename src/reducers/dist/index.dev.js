"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _authReducer = _interopRequireDefault(require("./authReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootReducer = (0, _redux.combineReducers)({
  authReducer: _authReducer["default"]
});
var _default = rootReducer;
exports["default"] = _default;