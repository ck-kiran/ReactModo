const path = require('path');
const baseConfig = require('./rspack.config.base');

module.exports = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist/esm'),
    filename: 'index.js',
    library: {
      type: 'module',
    },
    clean: true,
  },
  experiments: {
    outputModule: true,
  },
  mode: 'production',
};