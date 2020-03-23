const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
require("babel-polyfill");


module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      services: path.resolve(__dirname, 'src/services/'),
      style: path.resolve(__dirname, 'src/style/'),
      media: path.resolve(__dirname, 'src/media/')
    }
  },
  module: {
    rules: [
      // Image Loader
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      // SCSS Loader
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      // Babel Loader
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      // HTML Loader
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      favicon: './src/media/icons/favicon.svg'
    }),
  ]
};
