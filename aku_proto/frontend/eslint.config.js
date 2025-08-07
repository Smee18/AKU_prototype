const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  // Base Expo ESLint config
  expoConfig,

  // Add ignores
  {
    ignores: ['dist/**'],
  },

  // Custom settings
  {
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
]);
