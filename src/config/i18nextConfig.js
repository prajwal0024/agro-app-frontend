const i18nextConfig = {
  fallbackLng: 'en',
  detection: {
    order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
    caches: ['cookie'],
  },
  backend: {
    loadPath: '/assets/locales/{{lng}}/translations.json',
  },
  react: { useSuspense: false },
};

export default i18nextConfig;
