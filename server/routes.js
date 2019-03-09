require('gun/lib/open.js')
require('gun/lib/then.js')
const _ = require('underscore')
const db = require('./db')

function toResponse(obj) {
    return _.omit(obj, (_, key, _) => { return key == '_' })
}

async function hydrate(gun, node, property) {    
    let value = await gun.get(node[property]['#']).then()        
    console.log(value)
    let response = toResponse(value)
    console.log(response)
    node[property] = response
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

module.exports.getResource = async (req, res, next) => {
    const resource_id = req.params['resource_id']
    if (!resource_id) return res.status(400).send({'message': 'Invalid resource ID'})

    const resource = await req.gun.get(resource_id).then()    
    
    await hydrate(req.gun, resource, 'topic')    

    res.send(toResponse(resource))

    /*
    (function (data) {        
        if (!data) return res.status(404).send()
        res.send(data)
    })
    */
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

    resourceId = db.addResource2Topic(topic, title, url)

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


