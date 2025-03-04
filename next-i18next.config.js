module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
  },
  localePath: './public/locales',
  detection: {
    // This prevents URL mutations
    lookupFromPathIndex: -1,
    order: ['localStorage', 'cookie', 'htmlTag'],
  }
}