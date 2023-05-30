const {join} = require('path');

module.exports = {
  resolve: {
    alias: {
      '@publicDir': join(process.cwd(), 'public')
    }
  }
}
