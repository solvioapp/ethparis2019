const Gun = require('gun')
const crypto = require('crypto');
require('gun/lib/open.js')

function hash(string){
	return crypto.createHmac('sha256', string)
                   .digest('hex');
}

const gun = Gun()

function createTopic(name){
	gun.get('topics').set(
		gun.get(hash(name)).put({
			title: name
		})
	);
}

async function addResource2Topic(topicName, title, url){
	let t = gun.get(hash(topicName));
	let s = gun.get(hash(url)).put({
		title,
		url,
		topic: t
	})
	gun.get(hash(topicName)).get('resources').set(s);
}

function addReview2Resource(reviewID, resourceURL, quality, length, dependencies, content){
	gun.get(hash(resourceURL)).get('reviews').set(
		gun.get('reviews/'+reviewID).put({
			quality,
			length,
			content,
		})
	);
	dependencies.forEach((d)=>{
		gun.get('reviews/'+reviewID).get('dependencies').set(
			{
				topic: gun.get(hash(d.topic)),
				weight: d.weight
			}
		)
	});
}

createTopic('cryptocurrencies');
createTopic('merkle tree');
createTopic('public key cryptography');
createTopic('hash functions');

addResource2Topic('cryptocurrencies', 'Bitcoin whitepaper', 'https://bitcoin.org/bitcoin.pdf');
/*
addReview2Resource(1337,'https://bitcoin.org/bitcoin.pdf', 10, 60, [
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
gun.get('topics').map().once(function (data, key) {
    console.log(key)
    console.log(data)
})

/*
gun.get('topics').open(function (data, key) {
    console.log(key)
    console.log(data)
})
gun.get('resources').once().open(function (data, key) {
    console.log(key)
    console.log(data)    
})*/
