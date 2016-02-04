'use strict'

var get = require('value-get')
var difference = require('array-differ')
var negate = require('negate')

module.exports = syncHash

function syncHash (array, hash, key) {
  key = key || 'id'

  return array(function (items) {
    var previous = Object.keys(hash)
    var current = items.map(get(key)).map(String)

    // Add new items
    current.filter(negate(hash.get)).forEach(function (key) {
      hash.put(key, null)
    })

    // Delete old items
    difference(previous, current).forEach(hash.delete)
  })
}
