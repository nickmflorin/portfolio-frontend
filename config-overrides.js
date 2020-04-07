const path = require('path');


module.exports = function override(config, env) {
  config.resolve = {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      services: path.resolve(__dirname, 'src/services/'),
      style: path.resolve(__dirname, 'src/style/'),
      media: path.resolve(__dirname, 'src/media/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      config: path.resolve(__dirname, 'src/config.js'),
    }
  }
  return config;
}
