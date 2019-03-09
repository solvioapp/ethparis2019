const Gun = require('gun')
const db = require('./db');
const gun = Gun()
const util = require('util')

db.createTopic('cryptocurrencies');
db.createTopic('merkle tree');
db.createTopic('public key cryptography');
db.createTopic('hash functions');

db.addResource2Topic('cryptocurrencies', 'Bitcoin Whitepaper', 'https://bitcoin.org/bitcoin.pdf');

let resourceID = db.hash('https://bitcoin.org/bitcoin.pdf')

db.addReview2Resource(1337,resourceID, 10, 60, [
	{
		topic: 'merkle tree',
		weight: 2
	},
	{
		topic: 'public key cryptography',
		weight: 4
	},
	{
		topic: 'hash functions',
		weight: 5
	},
], 'send coins pls');

db.addReview2Resource(1338,resourceID, 8, 90, [
	{
		topic: 'merkle tree',
		weight: 2
	},
	{
		topic: 'public key cryptography',
		weight: 5
	}
], 'ETH giveaway');

/*
var ethereum = gun.get('topic/ethereum').put({
    title: 'Ethereum'
})
gun.get('topics').set(ethereum)

var example1 = gun.get('resource1').put({
    title: 'Example 1',
    url: 'http://example.org'
})
var example2 = gun.get('resource/example2').put({
    title: 'Example 2',
    url: 'http://example2.org'
})
var review1 = gun.get('review1').put({
    content: 'Very good resource',
    quality: 10
})
var review2 = gun.get('review2').put({
    content: 'Not very good resource',
    quality: 3
})
example2.get('topic').set(ethereum)
gun.get('resources').set(example1)
gun.get('resources').set(example2)
*/
gun.get('reviews/1337').open(function (data, key) {
    console.log(key)
    console.log(data)
})

/*
gun.get('topics').open(function (data, key) {
    console.log(key)
    console.log(data)
})
*/
gun.get('2f7d03db066cfb87d42bea917845568b94fc31bcebf4dd03acd5258ce2d83dc7').get('reviews').open(function (data, key) {    
    console.log(key)    
    console.log(util.inspect(data, {showHidden: false, depth: null}))
})

console.log(gun)
