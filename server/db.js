const Gun = require('gun')
const crypto = require('crypto')
require('gun/lib/open.js')

const gun = Gun()

function hash (string){
	return crypto.createHmac('sha256', string)
                   .digest('hex');
}

module.exports.hash = hash

module.exports.createTopic = function (name) {
	gun.get('topics').set(
		gun.get(hash(name)).put({
			title: name
		})
	);
}

module.exports.addResource2Topic = function (topicName, title, url) {
	let t = gun.get(hash(topicName));
	let s = gun.get(hash(url)).put({
		title,
		url
	})
	s.get('topic').put(t);
	gun.get(hash(topicName)).get('resources').set(s);
}

module.exports.addReview2Resource = function (reviewID, resourceURL, quality, length, dependencies, content) {
	gun.get(hash(resourceURL)).get('reviews').set(
		gun.get('reviews/'+reviewID).put({
			quality,
			length,
			content,
		})
	);
	dependencies.forEach((d)=>{
		gun.get('reviews/'+reviewID).get('dependencies').get('topic').put(gun.get(hash(d.topic)));
		gun.get('reviews/'+reviewID).get('dependencies').get('weight').put(d.weight);
	});
}
