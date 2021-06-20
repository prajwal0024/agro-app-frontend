"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _authActions = require("../actions/authActions");

var _routes = require("../constants/routes");

var _axiosErrorHandler = _interopRequireDefault(require("./axiosErrorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var handleLogout = function handleLogout(dispatch, history) {
  return regeneratorRuntime.async(function handleLogout$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]('/api/v1/users/token'));

        case 3:
          // 2. Clear Header
          _axios["default"].defaults.headers.common['Authorization'] = null; // 3. Clear user from memory

          _context.next = 6;
          return regeneratorRuntime.awrap(dispatch((0, _authActions.logout)()));

        case 6:
          // 4. Redirect
          history.push(_routes.LOGIN_ROUTE);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          (0, _axiosErrorHandler["default"])(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var _default = handleLogout;
exports["default"] = _default;