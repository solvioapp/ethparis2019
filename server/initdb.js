const Gun = require('gun')
const db = require('./db');
const gun = Gun()
const util = require('util')

db.createTopic('cryptocurrencies');
db.createTopic('merkle tree');
db.createTopic('public key cryptography');
db.createTopic('hash functions');
db.createTopic('K')
db.createTopic('K-EVM')
db.createTopic('Formal verification of smart contracts using K')
db.createTopic('proof of stake')

db.addResource2Topic('cryptocurrencies', 'Bitcoin Whitepaper', 'https://bitcoin.org/bitcoin.pdf');
db.addResource2Topic('K', 'K Tutorial', 'https://github.com/kframework/k/tree/master/k-distribution/tutorial/')
db.addResource2Topic('K-EVM', 'Formal Verification Workshop 1', 'https://www.youtube.com/watch?v=d6qHxDIeFw0')
db.addResource2Topic('Formal verification of smart contracts using K', 'Formal Verification Workshop 2', 'https://www.youtube.com/watch?v=n6AgBIkHlhg')
db.addResource2Topic('proof of stake', 'A Proof of Stake Design Philosophy', 'https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51')
db.addResource2Topic('public key cryptography', 'Asymmetric Cryptography and Key Management', 'https://www.coursera.org/learn/asymmetric-crypto')

let bitcoinResourceId = db.hash('https://bitcoin.org/bitcoin.pdf')

db.addReview2Resource(1337,bitcoinResourceId, 10, 60, [
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

db.addReview2Resource(1338,bitcoinResourceId, 8, 90, [
	{
		topic: 'merkle tree',
		weight: 2
	},
	{
		topic: 'public key cryptography',
		weight: 5
	}
], 'ETH giveaway');

db.addReview2Resource(1339, db.hash('https://www.coursera.org/learn/asymmetric-crypto'), 8, 120, [], 'This is quite a good course')


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
