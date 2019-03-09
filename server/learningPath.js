const Gun = require('gun')
const _=require('underscore')

const gun = Gun()
const db = require('./db');

function gun2array(obj){
	return Object.keys(obj).filter((k)=>k!='_');
}

function flatten(arr){
	return [].concat.apply([], arr.filter((u)=>u!=undefined).map(gun2array))
}

function cleanObj(obj){
	delete obj['_'];
	return obj;
}

async function getTopicDeps(topic){
	topicDeps={}
	resources = await gun.get(db.hash(topic)).get('resources').once().then();
	reviews = await Promise.all(gun2array(resources).map((resKey)=>
		gun.get(resKey).get('reviews').once().then()
	));
	reviewVals = await Promise.all(flatten(reviews).map((reviKey)=>
		gun.get(reviKey).once().then()
	));
	resourceVals = await Promise.all(gun2array(resources).map((resKey)=>
		gun.get(resKey).once().then()
	));
	resourceVals=_.clone(resourceVals).map(cleanObj);
	offset=0;
	for(i=0; i<resourceVals.length; i++){
		if(reviews[i]==undefined){
			resourceVals[i].reviews=null;
			offset+=1;
		} else{
			resourceVals[i].reviews=cleanObj(reviewVals[i-offset]);
		}
	}

	console.log('a')

	dependencies = await Promise.all(flatten(reviews).map((revKey)=>
		gun.get(revKey).get('dependencies').once().then()
	));
	console.log('a')
	depVals = await Promise.all(flatten(dependencies).map((depKey)=>
		gun.get(depKey).once().then()
	));
	console.log('a')
	depVals.forEach((dep)=>{
		topicDeps[dep.topic['#']]=topicDeps[dep.topic['#']]+dep.weight||dep.weight;
	});
	console.log(topicDeps)
	//return {topicDeps, resourceVals};
}

async function getLearningPath(topic){
	return 1
}

//getLearningPath('cryptocurrencies');
getTopicDeps('cryptocurrencies');
