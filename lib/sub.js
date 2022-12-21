const { curry } = require('yafu')

exports.sub = curry((a, b) => a - b)
