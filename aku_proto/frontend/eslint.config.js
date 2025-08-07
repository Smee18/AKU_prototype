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

  // Language options (replaces env + globals in flat config)
  {
    languageOptions: {
      globals: {
        myCustomGlobal: 'readonly',
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
]);
