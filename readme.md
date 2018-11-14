# observ-sync-hash [![Build Status](https://travis-ci.org/bendrucker/observ-sync-hash.svg?branch=master)](https://travis-ci.org/bendrucker/observ-sync-hash) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/observ-sync-hash.svg)](https://greenkeeper.io/)

> Synchronize an observable hash table with an array with primary keys


## Install

```
$ npm install --save observ-sync-hash
```


## Usage

```js
var sync = require('observ-sync-hash')
var ObservArray = require('observ-array')
var Hash = require('observ-varhash')

var array = ObservArray([])
var hash = Hash({})

sync(array, hash)

array.push(123)
hash()
//=> {123: null}

array.splice(0, 1)
hash()
//=> {}
```

## API

#### `sync(array, hash, [key])` -> `function`

Returns an `unlisten` function.

##### array

*Required*  
Type: `function`

An [observable array](https://github.com/raynos/observ-array)

##### hash

*Required*  
Type: `function`

An [observable hash](https://github.com/nrw/observ-varhash)

##### options

##### key

Type: `string`

If provided, the hash keys will be derived from a property of each array item instead of the string values themselves. You can use `id` or even dot syntax, e.g. `foo.id`.

###### values

Type: `boolean`  
Default: `false`

If `true`, data from the array will be added to the hash instead of `null` values. 


## License

MIT © [Ben Drucker](http://bendrucker.me)
