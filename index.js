if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/hi-request.min.js')
} else {
  module.exports = require('./dist/hi-request.js')
}
