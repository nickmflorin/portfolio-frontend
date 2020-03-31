const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
require("babel-polyfill");

// TODO: Load from env
debug = true;

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  devtool: debug ? "inline-sourcemap" : true,
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      services: path.resolve(__dirname, 'src/services/'),
      style: path.resolve(__dirname, 'src/style/'),
      media: path.resolve(__dirname, 'src/media/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      config: path.resolve(__dirname, 'src/config/')
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
  output: {
    path: __dirname + "/public/",
    filename: "build.js"
  },
  devServer: {
      port: 3000,
      contentBase: './public',
      // Proxy URLs to Backend Development Server
      // proxy: {
      //   '/api': 'http://localhost:8000/api/v1'
      // },
      inline: true,
      historyApiFallback: true,
  },
  plugins: [
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    // new InterpolateHtmlPlugin(env.raw),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      // favicon: './src/media/icons/favicon.svg'
    }),
  ]
};
