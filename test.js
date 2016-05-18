'use strict'

var test = require('tape')
var ObservArray = require('observ-array')
var Hash = require('observ-varhash')
var Observ = require('observ')
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

  var item1 = Observ({id: 1, foo: 'a'})
  var item2 = Observ({id: 2, foo: 'b'})
  array.push(item1, item2)

  t.deepEqual(hash(), {
    1: {id: 1, foo: 'a'},
    2: {id: 2, foo: 'b'}
  }, 'adds hash items with values')

  t.equal(hash[1], item1, 'saves observ reference')
  t.equal(hash[2], item2, 'saves observ reference')

  array.splice(0, 1)

  t.deepEqual(hash(), {
    2: {id: 2, foo: 'b'}
  }, 'removes hash items with values')

  t.equal(hash[2], item2, 'saves observ reference')

  unlisten()

  array.splice(0, 1)
  t.deepEqual(hash(), {
    2: {id: 2, foo: 'b'}
  }, 'unlisten')

  t.end()
})
