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

test('key (backwards compatible string)', function (t) {
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

test('key (options.key)', function (t) {
  var array = ObservArray([])
  var hash = Hash({})

  var unlisten = sync(array, hash, {key: 'id'})

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

test('options.values', function (t) {
  var array = ObservArray([])
  var hash = Hash({})

  var unlisten = sync(array, hash, {key: 'id', values: true})

  array.push({id: 1, foo: 'a'}, {id: 2, foo: 'b'})

  t.deepEqual(hash(), {
    1: {id: 1, foo: 'a'},
    2: {id: 2, foo: 'b'}
  }, 'adds hash items with values')

  // Saves references to values
  t.equal(hash()['1'], array()[0], 'saves reference')

  array.splice(0, 1)

  t.deepEqual(hash(), {
    2: {id: 2, foo: 'b'}
  }, 'removes hash items with values')

  unlisten()

  array.splice(0, 1)
  t.deepEqual(hash(), {
    2: {id: 2, foo: 'b'}
  }, 'unlisten')

  t.end()
})
