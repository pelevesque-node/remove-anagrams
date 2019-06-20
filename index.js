'use strict'

const isAnagram = require('@pelevesque/is-anagram')

module.exports = (arr,
  { groupBy = 1, canonicalize = false, substringsToIgnore = [], remove = true } = {}
) => {
  const indexesToRemove = []
  for (let i = 0, len = arr.length - 1; i < len; i++) {
    if (indexesToRemove.indexOf(i) === -1) {
      for (let j = i + 1, len = arr.length; j < len; j++) {
        const opts = {
          groupBy: groupBy,
          canonicalize: canonicalize,
          substringsToIgnore: substringsToIgnore
        }
        if (isAnagram(arr[i], arr[j], opts)) {
          indexesToRemove.push(j)
        }
      }
    }
  }
  indexesToRemove.sort((a, b) => b - a) // sort descending
  const anagrams = []
  indexesToRemove.forEach(v => {
    anagrams.unshift(arr[v])
    if (remove) arr.splice(v, 1)
  })
  return anagrams
}
