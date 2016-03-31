'use strict'

var test = require('tape')
var ObservArray = require('observ-array')
var Hash = require('observ-varhash')
var sync = require('./')

test('simple', function (t) {
  var array = ObservArray([])
  var hash = Hash({})

  var unlisten = sync(array, hash)

  array.push(1, 2)

  t.deepEqual(hash(), {
    1: null,
    2: null
  }, 'adds hash items')

  array.splice(0, 1)

  t.deepEqual(hash(), {
    2: null
  }, 'removes hash items')

  unlisten()

  array.splice(0, 1)
  t.deepEqual(hash(), {
    2: null
  }, 'unlisten')

  t.end()
})

test('key', function (t) {
  var array = ObservArray([])
  var hash = Hash({})

  var unlisten = sync(array, hash, 'id')

  array.push({id: 1}, {id: 2})

  t.deepEqual(hash(), {
    1: null,
    2: null
  }, 'adds hash items')

  array.splice(0, 1)

  t.deepEqual(hash(), {
    2: null
  }, 'removes hash items')

  unlisten()

  array.splice(0, 1)
  t.deepEqual(hash(), {
    2: null
  }, 'unlisten')

  t.end()
})
