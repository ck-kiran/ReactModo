/* eslint-disable no-undef */
const path = require('path');
const baseConfig = require('./rspack.config.base');

module.exports = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist/cjs'),
    filename: 'index.js',
    library: {
      type: 'commonjs2',
    },
    clean: true,
  },
  mode: 'production',
  target: ['web', 'es5'], // Better compatibility
};
