# observ-sync-hash [![Build Status](https://travis-ci.org/bendrucker/observ-sync-hash.svg?branch=master)](https://travis-ci.org/bendrucker/observ-sync-hash)

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

array.push({id: 123})
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

##### key

Type: `string`  
Default: `'id'`

The identifying key in each array item that will be used as the storage key in the hash.


## License

MIT © [Ben Drucker](http://bendrucker.me)
