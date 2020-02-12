/* global describe, it */
'use strict'

const expect = require('chai').expect
const removeAnagrams = require('../index')

describe('#removeAnagrams()', () => {
  it('should return an empty array when an empty array is provided', () => {
    const arr = []
    const anagrams = removeAnagrams(arr)
    const expectedArr = []
    const expectedAnagrams = []
    expect(JSON.stringify(arr)).to.equal(JSON.stringify(expectedArr))
    expect(JSON.stringify(anagrams)).to.equal(JSON.stringify(expectedAnagrams))
  })

  it('should not remove anything when no anagrams are present', () => {
    const arr = [
      '12345',
      'abcdef',
      '!@#$%'
    ]
    const anagrams = removeAnagrams(arr)
    const expectedArr = [
      '12345',
      'abcdef',
      '!@#$%'
    ]
    const expectedAnagrams = []
    expect(JSON.stringify(arr)).to.equal(JSON.stringify(expectedArr))
    expect(JSON.stringify(anagrams)).to.equal(JSON.stringify(expectedAnagrams))
  })

  it('should remove classic anagrams', () => {
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
    const expectedArr = [
      '12345',
      'elvis',
      '!@#$%'
    ]
    const expectedAnagrams = [
      'lives',
      '34251',
      'silve',
      '%$#@!'
    ]
    expect(JSON.stringify(arr)).to.equal(JSON.stringify(expectedArr))
    expect(JSON.stringify(anagrams)).to.equal(JSON.stringify(expectedAnagrams))
  })

  it('should remove anagrams with numeric grouping (other than 1)', () => {
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
    const expectedArr = [
      '123abc456',
      'a1b2c3456',
      '456def789gh',
      '4g5hdef6789'
    ]
    const expectedAnagrams = [
      'abc456123',
      '789ghdef456'
    ]
    expect(JSON.stringify(arr)).to.equal(JSON.stringify(expectedArr))
    expect(JSON.stringify(anagrams)).to.equal(JSON.stringify(expectedAnagrams))
  })

  it('should remove anagrams with explicit grouping', () => {
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
    const expectedArr = [
      '22boy321j',
      'aabbccdd',
      'b2o2y3j21',
      'aabbccdd',
      'ccbbaadd'
    ]
    const expectedAnagrams = [
      'j321boy22',
      'boy22321j',
      '22boy321j'
    ]
    expect(JSON.stringify(arr)).to.equal(JSON.stringify(expectedArr))
    expect(JSON.stringify(anagrams)).to.equal(JSON.stringify(expectedAnagrams))
  })

  it('should work with the canonicalize option', () => {
    const arr = [
      'ElviS',
      'lives', // 0
      'AmwÉ',
      'earnw' // 2
    ]
    const opts = { canonicalize: true }
    const anagrams = removeAnagrams(arr, opts)
    const expectedArr = [
      'ElviS',
      'AmwÉ'
    ]
    const expectedAnagrams = [
      'lives',
      'earnw'
    ]
    expect(JSON.stringify(arr)).to.equal(JSON.stringify(expectedArr))
    expect(JSON.stringify(anagrams)).to.equal(JSON.stringify(expectedAnagrams))
  })

  it('should work with substringsToIgnore', () => {
    const arr = [
      'christmas tree',
      'search, set, trim', // 0
      'christmastree', // 0
      'elvis',
      'lives' // 3
    ]
    const opts = { substringsToIgnore: [' ', ','] }
    const anagrams = removeAnagrams(arr, opts)
    const expectedArr = [
      'christmas tree',
      'elvis'
    ]
    const expectedAnagrams = [
      'search, set, trim',
      'christmastree',
      'lives'
    ]
    expect(JSON.stringify(arr)).to.equal(JSON.stringify(expectedArr))
    expect(JSON.stringify(anagrams)).to.equal(JSON.stringify(expectedAnagrams))
  })

  it('should work with the remove option', () => {
    const arr = [
      'elvis',
      'lives', // 0
      'aabbcc',
      'aabbcc', // 2
      'ccbbaa' // 2
    ]
    const opts = { remove: false }
    const anagrams = removeAnagrams(arr, opts)
    const expectedArr = [
      'elvis',
      'lives',
      'aabbcc',
      'aabbcc',
      'ccbbaa'
    ]
    const expectedAnagrams = [
      'lives',
      'aabbcc',
      'ccbbaa'
    ]
    expect(JSON.stringify(arr)).to.equal(JSON.stringify(expectedArr))
    expect(JSON.stringify(anagrams)).to.equal(JSON.stringify(expectedAnagrams))
  })
})
