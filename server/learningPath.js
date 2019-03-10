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

async function getTopicDeps(gun, topic){
	let topicDeps={}
	let resources = await gun.get(topic).get('resources').once().then();
	if(resources==undefined){
		return {topicDeps:{}, finalResources:[]}
	}
	console.log(resources)
	let reviews = await Promise.all(gun2array(resources).map((resKey)=>
		gun.get(resKey).get('reviews').once().then()
	));
	console.log(reviews)
	let reviewVals = await Promise.all(flatten(reviews).map((reviKey)=>
		gun.get(reviKey).once().then()
	));
	//console.log(reviewVals)
	let resourceVals = await Promise.all(gun2array(resources).map((resKey)=>
		gun.get(resKey).once().then()
	));
	let offset=0;
	let finalResources=[]
	for(i=0; i<resourceVals.length; i++){
		finalResources.push(cleanObj(_.clone(resourceVals[i])))
		finalResources[i].reviews={length:0, quality:0};
		if(reviews[i]!=undefined){
			console.log(gun2array(reviews[i]))
			for(j=0; j<gun2array(reviews[i]).length; j++){
				//console.log(reviewVals[j+offset])
				//finalResources[i].reviews.push(cleanObj(_.clone(reviewVals[j+offset])));
				finalResources[i].reviews={
					length: finalResources[i].reviews.length+reviewVals[j+offset].length/gun2array(reviews[i]).length,
					quality: finalResources[i].reviews.quality+reviewVals[j+offset].quality/gun2array(reviews[i]).length
				};

			}
			offset+=reviews[i].length;
		}
	}

	let dependencies = await Promise.all(flatten(reviews).map((revKey)=>
		gun.get(revKey).get('dependencies').once().then()
	));
	let depVals = await Promise.all(flatten(dependencies).map((depKey)=>
		gun.get(depKey).once().then()
	));
	//console.log(depVals)
	depVals.forEach((dep)=>{
		topicDeps[dep.topic['#']]=topicDeps[dep.topic['#']]+dep.weight||dep.weight;
	});
	//console.log('a')
	return {topicDeps, finalResources};
}



async function getLearningPath(gun, initialTopic, time){
	let topics=[{
		topic:initialTopic,
		weight:1
	}]
	let resources=[]
	while(time>=0 && topics.length>0){
		let topic=topics[0].topic;
		//console.log(resources)
		let stuff=await getTopicDeps(gun, topic)
		let sumWeights=0;
		Object.keys(stuff.topicDeps).forEach((t)=>sumWeights+=stuff.topicDeps[t])
		Object.keys(stuff.topicDeps).forEach((t)=>{
			let found=false
			let topu={
				topic:t,
				weight:stuff.topicDeps[t]
			}
			topics.forEach((to)=>{
				if(to.topic==topu.topic){
					to.weight+=topu.weight/sumWeights;
					found=true;
				}
			})
			if(!found){
				topics.push({
					topic:topu.topic,
					weight:topu.weight/sumWeights
				})
			}
		})
		//console.log(stuff.finalResources)
		let maxim=null
		let maxVal=0
		stuff.finalResources.forEach((v)=>{
			//console.log(v)
			let val=Number(v.reviews.quality)*Number(v.reviews.length)
			//console.log(val)
			if(val > maxVal){
				val=maxVal;
				maxim=v
			}
		})
		if(maxim){
			resources.push(maxim);
			time-=maxim.reviews.length;
		}
		topics=topics.slice(1).sort((e1, e2)=>e1.weight<e2.weight);
		//console.log(topics)
	}
	console.log(resources);
	return resources;
}

getLearningPath(gun, db.hash('cryptocurrencies'), 100);
//getTopicDeps('cryptocurrencies');

module.exports.getLearningPath = getLearningPath
