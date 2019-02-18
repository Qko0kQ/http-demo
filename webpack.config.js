const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
  mode: 'development',

  entry: {
    app: [`${APP_DIR}/index.js`],
  },

  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    library: 'lib',
    libraryTarget: 'var',
  },

  context: path.join(__dirname, 'source'),

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: [/node_modules/],
        include: APP_DIR,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?-url', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?-url', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        loaders: ['raw-loader'],
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: `${APP_DIR}/index.html`, to: BUILD_DIR },
      { from: `${APP_DIR}/assets/`, to: `${BUILD_DIR}/assets/` },
    ]),
  ],
};

module.exports = config;
