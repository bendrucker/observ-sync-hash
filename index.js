'use strict'

var get = require('value-get')
var difference = require('array-differ')

module.exports = syncHash

function syncHash (array, hash, options) {
  options = options || {}

  // Backwards compatibility: third parameter key was a string in 2.0.x
  var key = typeof options === 'string' ? options : options.key
  var values = Boolean(options.values)

  return array(function (items) {
    var previous = Object.keys(hash)
    var current = items.map(key ? get(key) : identity).map(String)

    // Add new items
    current.forEach(function (key, index) {
      if (hash.get(key)) return
      hash.put(key, values ? array.get(index) : null)
    })

    // Delete old items
    difference(previous, current).forEach(hash.delete)
  })
}

function identity (value) {
  return value
}
