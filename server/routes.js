require('gun/lib/open.js')
require('gun/lib/then.js')
const _ = require('underscore')
const db = require('./db')
const { getLearningPath } = require('./learningPath')

function toResponse(obj) {
    return _.omit(obj, '_')
}

async function hydrate(gun, node, property) {
    let value = await gun.get(node[property]['#']).then()
    node[property] = toResponse(value)
}

async function hydrateSet(gun, node, property) {
    await hydrate(gun, node, property) 
    for (i in node[property]) {
        await hydrate(gun, node[property], i)
    }
}

module.exports.getTopics = async (req, res, next) => {
    topics = await req.gun.get('topics').once().then()
    result = []
    for (i in topics) {
        if (i != '_') {
            topic = await req.gun.get(i).once().then()
            if (topic && topic['title']) {
                result.push({
                    'id': i,
                    'title': topic['title']
                })
            }
        }
    }
    res.send(result)
}

async function hydrateResource(gun, resource) {
    await hydrate(gun, resource, 'topic')
    await hydrateSet(gun, resource, 'reviews')

    for (review_id in resource['reviews']) {
        await hydrateSet(gun, resource['reviews'][review_id], 'dependencies')
        for (dependency_id in resource['reviews'][review_id]['dependencies']) {
            await hydrate(gun, resource['reviews'][review_id]['dependencies'][dependency_id], 'topic')
        }
    }
}

function transformReview(id, review) {
    var dependencies = []
    for (var i in review['dependencies']) {
        var dependency = review['dependencies'][i]
        dependencies.push({
            topic: dependency['topic']['title'],
            weight: dependency['weight']
        })
    }  

    return {
        id: id,
        content: review['content'],
        length: review['length'],
        quality: review['quality'],
        dependencies: dependencies
    }
}

function transformResource(id, resource) {
    reviews = []
    for (var i in resource['reviews']) {
        reviews.push(transformReview(i, resource['reviews'][i]))
    }
    return {
        id: id,
        title: resource['title'],
        url: resource['url'],
        topic: resource['topic']['title'],
        reviews: reviews
    }
}

module.exports.getResource = async (req, res, next) => {
    const resource_id = req.params['resource_id']
    if (!resource_id) return res.status(400).send({'message': 'Invalid resource ID'})

    let resource = await req.gun.get(resource_id).then()
    if (!resource) return res.sendStatus(404)    

    resource = toResponse(resource)
    await hydrateResource(req.gun, resource)
    resource = transformResource(resource_id, resource)
    res.send(resource)
}

module.exports.getResources = async (req, res, next) => {
    const topic_id = req.params['topic_id']
    if (!topic_id) return res.status(400).send({'message': 'Missing topic ID'})

    let topic = await req.gun.get(topic_id).once().then()
    if (!topic) return res.sendStatus(404)

    let resources = await req.gun.get('topics').get(topic_id).get('resources').once().then()

    let result = []

    resources = toResponse(resources)

    console.log(resources)

    for (var i in resources) {
        await hydrate(req.gun, resources, i)
        await hydrateResource(req.gun, resources[i])
        result.push(transformResource(i, resources[i]))
    }
    
    res.send(result)
}

module.exports.getLearningPaths = async (req, res, next) => {
    let topic_id = req.params['topic_id']
    let length = req.query['length']

    if (!topic_id) return res.status(400).send({'message': 'Missing topic ID'})
    if (!length) return res.status(400).send({'message': 'Missing length'})
    
    let path = await getLearningPath(req.gun, topic_id, length)

    res.send([path])
}

module.exports.getReviews = async (req, res, next) => {    
    const resource_id = req.params['resource_id']
    if (!resource_id) return res.status(400).send({'message': 'Invalid resource ID'})
    
    reviews = await req.gun.get(resource_id).get('reviews').then()

    if (!reviews) return res.status(404).send()

    result = {}

    for (i in reviews) {
        if (i != '_') {
            id = reviews[i]['#']
            review = await req.gun.get(id).then()
            result[i] = {
                content: review['content'],
                quality: review['quality']
            }
        }
    }

    res.send(result)
}

module.exports.postResource = async (req, res, next) => {    
    const topic = req.body['topic']
    const title = req.body['title']
    const url = req.body['url']

    if (!topic) return res.status(400).send({'message': 'Missing topic'})
    if (!title) return res.status(400).send({'message': 'Missing title'})
    if (!url) return res.status(400).send({'message': 'Missing url'})

    let resourceId = db.addResource2Topic(topic, title, url)

    res.status(200).send({'id': resourceId})
}

module.exports.postReview = async (req, res, next) => {
    const resource_id = req.params['resource_id']
    const review_id = req.params['review_id']    

    const quality = req.body['quality']
    const length = req.body['length']
    const dependencies = req.body['dependencies']
    const content = req.body['content']

    if (!quality) return res.status(400).send({'message': 'Missing quality'})
    if (!length) return res.status(400).send({'message': 'Missing length'})
    if (!dependencies) return res.status(400).send({'message': 'Missing dependencies'})
    if (!content) return res.status(400).send({'message': 'Missing content'})

    db.addReview2Resource(review_id, resource_id, quality, length, dependencies, content)

    res.sendStatus(204)
}

module.exports.search = async (req, res, next) => {
    const q = req.query['q']
    if (!q) return res.status(400).send({'message': 'Missing query'})

    let topics = await req.gun.get('topics').once().then()
    let resources = await req.gun.get('resources').once().then()

    topics = toResponse(topics)
    resources = toResponse(resources)

    result_topics = []

    for (i in topics) {
        await hydrate(req.gun, topics, i)
        if (topics[i] && matchQuery(q, topics[i]['title'])) {
            result_topics.push({
                'id': i,
                'title': topics[i]['title']
            })
        }
    }

    result_resources = []

    for (i in resources) {
        await hydrate(req.gun, resources, i)
        if (matchQuery(q, resources[i]['title'])) {
            result_resources.push({
                'id': i,
                'title': resources[i]['title']
            })
        }
    }

    res.send({
        'topics': result_topics,
        'resources': result_resources
    })
}

function matchQuery(q, str) {
    return q && str && str.toLowerCase().indexOf(q.toLowerCase()) != -1
}
