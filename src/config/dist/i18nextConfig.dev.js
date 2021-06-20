"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var i18nextConfig = {
  fallbackLng: 'en',
  detection: {
    order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
    caches: ['cookie']
  },
  backend: {
    loadPath: '/assets/locales/{{lng}}/translations.json'
  },
  react: {
    useSuspense: false
  }
};
var _default = i18nextConfig;
exports["default"] = _default;