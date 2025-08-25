// rspack.config.dev.js
const path = require('path');
const { HtmlRspackPlugin } = require('@rspack/core');

module.exports = {
  entry: {
    main: './src/dev/index.tsx',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlRspackPlugin({
      template: './src/dev/index.html',
      filename: 'index.html',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist/dev'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: '/',
  },
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'src/dev'),
    },
  },
  externals: {}, // Don't externalize React in dev mode
  devtool: 'eval-source-map',
};
