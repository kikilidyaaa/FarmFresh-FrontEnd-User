const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
    rute: path.resolve(__dirname, 'src/scripts/rute.js'),
    auth: path.resolve(__dirname, 'src/scripts/auth.js'),
    cart: path.resolve(__dirname, 'src/scripts/views/pages/cart.js'),
    checkout: path.resolve(__dirname, 'src/scripts/views/pages/checkout.js'),
    order: path.resolve(__dirname, 'src/scripts/views/pages/order.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
      chunks: ['rute', 'auth', 'app', 'cart'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: path.resolve(__dirname, 'src/templates/login.html'),
      chunks: ['rute', 'auth'],
    }),
    new HtmlWebpackPlugin({
      filename: 'registrasi.html',
      template: path.resolve(__dirname, 'src/templates/registrasi.html'),
      chunks: ['rute', 'auth'],
    }),
    new HtmlWebpackPlugin({
      filename: 'profile.html',
      template: path.resolve(__dirname, 'src/templates/profile.html'),
      chunks: ['rute', 'auth'],
    }),
    new HtmlWebpackPlugin({
      filename: 'cart.html',
      template: path.resolve(__dirname, 'src/templates/cart.html'),
      chunks: ['rute', 'cart'],
    }),
    new HtmlWebpackPlugin({
      filename: 'checkout.html',
      template: path.resolve(__dirname, 'src/templates/checkout.html'),
      chunks: ['rute', 'checkout'],
    }),
    new HtmlWebpackPlugin({
      filename: 'order.html',
      template: path.resolve(__dirname, 'src/templates/order.html'),
      chunks: ['rute', 'order'],
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: path.resolve(__dirname, 'src/templates/about.html'),
      chunks: ['rute'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      maximumFileSizeToCacheInBytes: 7 * 1024 * 1024,
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.href.startsWith('https://farmfresh-backend.vercel.app/api'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'thefarmfresh-api',
          },
        },
      ],
    }),
  ],
};
