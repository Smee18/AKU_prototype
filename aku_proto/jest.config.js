// aku_proto/frontend/jest.config.js
const expoPreset = require('expo/jest-preset');

module.exports = {
  ...expoPreset,
  rootDir: './',  // Ensures Jest starts from frontend/
  modulePaths: ['<rootDir>'], // Resolves imports relative to frontend/
  moduleDirectories: ['node_modules', '<rootDir>/node_modules'],
  testMatch: ['**/__tests__/**/*.test.(js|ts|tsx)'],
};