'use strict'

var test = require('tape')
var ObservArray = require('observ-array')
var Hash = require('observ-varhash')
var sync = require('./')

test(function (t) {
  var array = ObservArray([])
  var hash = Hash({})

  var unlisten = sync(array, hash)

  array.push({id: 1}, {id: 2})

  t.deepEqual(hash(), {
    1: {},
    2: {}
  }, 'adds hash items')

  array.splice(0, 1)

  t.deepEqual(hash(), {
    2: {}
  }, 'removes hash items')

  unlisten()

  array.splice(0, 1)
  t.deepEqual(hash(), {
    2: {}
  }, 'unlisten')

  t.end()
})
