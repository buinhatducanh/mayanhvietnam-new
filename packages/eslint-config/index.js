/** Shared eslint config — dùng chung cho tất cả Next.js apps */
module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'react/no-unescaped-entities': 'off',
  },
};
