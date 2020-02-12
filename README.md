[![Build Status](https://travis-ci.org/pelevesque/remove-anagrams.svg?branch=master)](https://travis-ci.org/pelevesque/remove-anagrams)
[![Coverage Status](https://coveralls.io/repos/github/pelevesque/remove-anagrams/badge.svg?branch=master)](https://coveralls.io/github/pelevesque/remove-anagrams?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# remove-anagrams

Removes and returns anagrams from an array.

## Node Repository

https://www.npmjs.com/package/@pelevesque/remove-anagrams

## Installation

`npm install @pelevesque/remove-anagrams`

## Tests

Command                      | Description
---------------------------- | ------------
`npm test` or `npm run test` | All Tests Below
`npm run cover`              | Standard Style
`npm run standard`           | Coverage
`npm run unit`               | Unit Tests

## Usage

### Parameters

```js
arr     (required)
options (optional) default = { groupBy: 1, canonicalize: false, substringsToIgnore: [],  remove: true }
```

### Requiring

```js
const removeAnagrams = require('@pelevesque/remove-anagrams')
```

### Basic

```js
const arr = [
  '12345',
  'elvis',
  'lives', // 1
  '34251', // 0
  'silve', // 1
  '!@#$%',
  '%$#@!' // 5
]
const anagrams = removeAnagrams(arr)
/*
arr = [
  '12345',
  'elvis',
  '!@#$%'
]
anagrams = [
  'lives',
  '34251',
  'silve',
  '%$#@!'
]
*/
```

### Grouping by Length Option

```js
const arr = [
  '123abc456',
  'abc456123', // 0
  'a1b2c3456',
  '456def789gh',
  '789ghdef456', // 3
  '4g5hdef6789'
]
const opts = { groupBy: 3 }
const anagrams = removeAnagrams(arr, opts)
/*
arr = [
  '123abc456',
  'a1b2c3456',
  '456def789gh',
  '4g5hdef6789'
]
anagrams = [
  'abc456123',
  '789ghdef456'
]
*/
```

### Explicit Grouping Option

```js
const arr = [
  '22boy321j',
  'j321boy22', // 0
  'aabbccdd',
  'boy22321j', // 0
  '22boy321j', // 0
  'b2o2y3j21',
  'aabbccdd',
  'ccbbaadd'
]
const opts = { groupBy: ['22', 'boy', '321', 'j'] }
const anagrams = removeAnagrams(arr, opts)
/*
arr = [
  '22boy321j',
  'aabbccdd',
  'b2o2y3j21',
  'aabbccdd',
  'ccbbaadd'
]
anagrams = [
  'j321boy22',
  'boy22321j',
  '22boy321j'
]
*/
```

### Canonicalize Option

```js
const arr = [
  'ElviS',
  'lives', // 0
  'AmwÉ',
  'earnw' // 2
]
const opts = { canonicalize: true }
const anagrams = removeAnagrams(arr, opts)
/*
arr = [
  'ElviS',
  'AmwÉ'
]
anagrams = [
  'lives',
  'earnw'
]
*/
```

### Substrings To Ignore Option

```js
const arr = [
  'christmas tree',
  'search, set, trim', // 0
  'christmastree', // 0
  'elvis',
  'lives' // 3
]
const opts = { substringsToIgnore: [' ', ','] }
const anagrams = removeAnagrams(arr, opts)
/*
arr = [
  'christmas tree',
  'elvis'
]
anagrams = [
  'search, set, trim',
  'christmastree',
  'lives'
]
*/
```

### Remove Option

```js
const arr = [
  'elvis',
  'lives', // 0
  'aabbcc',
  'aabbcc', // 2
  'ccbbaa' // 2
]
const opts = { remove: false }
const anagrams = removeAnagrams(arr, opts)
/*
arr = [
  'elvis',
  'lives',
  'aabbcc',
  'aabbcc',
  'ccbbaa'
]
anagrams = [
  'lives',
  'aabbcc',
  'ccbbaa'
]
*/
```
