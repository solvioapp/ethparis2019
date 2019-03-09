const Gun = require('gun')
const crypto = require('crypto')
require('gun/lib/open.js')

const gun = Gun({
    isValid: function () { return true }
})

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
    let resourceId = hash(url)
	let s = gun.get(resourceId).put({
		title,
		url
	})
	s.get('topic').put(t);
	gun.get(hash(topicName)).get('resources').set(s);
    gun.get('resources').set(s);
    return resourceId
}

module.exports.addReview2Resource = function (reviewID, resourceID, quality, length, dependencies, content) {
	gun.get(resourceID).get('reviews').set(
		gun.get('reviews/'+reviewID).put({
			quality,
			length,
			content,
		})
	);
	dependencies.forEach((d)=>{
        let t = gun.get(hash(d.topic));
        if (t) {
            console.log(d);
            let s = gun.get('reviews/'+reviewID+'/deps/'+hash(d.topic)).put({
                weight: d.weight
            })
            s.get('topic').put(t);
            gun.get('reviews/'+reviewID).get('dependencies').set(s);
        }
	});
}
