const Gun = require('gun')
require('gun/lib/open.js')

const gun = Gun()

var ethereum = gun.get('topic/ethereum').put({
    title: 'Ethereum'
})
gun.get('topics').set(ethereum)

var example1 = gun.get('resource/example1').put({
    title: 'Example 1',
    url: 'http://example.org'
})
var example2 = gun.get('resource/example2').put({
    title: 'Example 2',
    url: 'http://example2.org'
})
example2.get('topic').set(ethereum)
gun.get('resources').set(example1)
gun.get('resources').set(example2)

gun.get('topics').map().once(function (data, key) {
    console.log(key)
    console.log(data)
})

gun.get('topics').open(function (data, key) {
    console.log(key)
    console.log(data)
})

gun.get('resources').once().open(function (data, key) {
    console.log(key)
    console.log(data)    
})
