const path = require('path');
const baseConfig = require('./rspack.config.base');

module.exports = {
  ...baseConfig,
  entry: './src/dev/index.tsx', // Development entry point
  output: {
    path: path.resolve(__dirname, 'dist/dev'),
    filename: 'bundle.js',
    clean: true,
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  plugins: [
    new (require('@rspack/core')).HtmlRspackPlugin({
      template: './src/dev/index.html',
    }),
  ],
  externals: {}, // Don't externalize for development
};