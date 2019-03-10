const Gun = require('gun')
const db = require('./db');
const gun = Gun()
const util = require('util')

db.createTopic(gun, 'cryptocurrencies');
db.createTopic(gun, 'merkle tree');
db.createTopic(gun, 'public key cryptography');
db.createTopic(gun, 'hash functions');
db.createTopic(gun, 'K')
db.createTopic(gun, 'K-EVM')
db.createTopic(gun, 'Formal verification of smart contracts using K')
db.createTopic(gun, 'proof of stake')
db.createTopic(gun, 'Ethereum')

db.addResource2Topic(gun, 'cryptocurrencies', 'Bitcoin Whitepaper', 'https://bitcoin.org/bitcoin.pdf');
db.addResource2Topic(gun, 'K', 'K Tutorial', 'https://github.com/kframework/k/tree/master/k-distribution/tutorial/')
db.addResource2Topic(gun, 'K-EVM', 'Formal Verification Workshop 1', 'https://www.youtube.com/watch?v=d6qHxDIeFw0')
db.addResource2Topic(gun, 'Formal verification of smart contracts using K', 'Formal Verification Workshop 2', 'https://www.youtube.com/watch?v=n6AgBIkHlhg')
db.addResource2Topic(gun, 'proof of stake', 'A Proof of Stake Design Philosophy', 'https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51')
db.addResource2Topic(gun, 'public key cryptography', 'Asymmetric Cryptography and Key Management', 'https://www.coursera.org/learn/asymmetric-crypto')
db.addResource2Topic(gun, 'Ethereum', 'A Next-Generation Smart Contract and Decentralized Application Platform', 'https://github.com/ethereum/wiki/wiki/White-Paper')
db.addResource2Topic(gun, 'merkle tree', 'Blockchain Fundamentals #1: What is a Merkle Tree?', 'https://medium.com/byzantine-studio/blockchain-fundamentals-what-is-a-merkle-tree-d44c529391d7')
db.addResource2Topic(gun, 'merkle tree', 'Merkling in Ethereum', 'https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/')

let bitcoinResourceId = db.hash('https://bitcoin.org/bitcoin.pdf')

db.addReview2Resource(gun, 1337,bitcoinResourceId, 10, 60, [
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

db.addReview2Resource(gun, 1338,bitcoinResourceId, 8, 90, [
	{
		topic: 'merkle tree',
		weight: 2
	},
	{
		topic: 'public key cryptography',
		weight: 5
	}
], 'ETH giveaway');

db.addReview2Resource(gun, 1339, db.hash('https://www.coursera.org/learn/asymmetric-crypto'), 8, 120, [], 'This is quite a good course')

db.addReview2Resource(gun, 1400, db.hash('https://github.com/ethereum/wiki/wiki/White-Paper'), 7, 100, [
	{
		topic: 'merkle tree',
		weight: 3
	},
	{
		topic: 'public key cryptography',
		weight: 6
	}
], 'An introductory paper to Ethereum, introduced before launch, which is maintained.')

db.addReview2Resource(gun, 14001, db.hash('https://medium.com/byzantine-studio/blockchain-fundamentals-what-is-a-merkle-tree-d44c529391d7'), 5, 20, [], 'A good intro to Merkle trees')

db.addReview2Resource(gun, 14002, db.hash('https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/'), 8, 20, [], "Very good explanation by Vitalik Buterin on usage of Merkle Patricia trees in Ethereum")

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
