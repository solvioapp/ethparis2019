require('gun/lib/open.js')
require('gun/lib/then.js')
const db = require('./db')

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

module.exports.getResource = (req, res, next) => {
    const resource_id = req.params['resourceId']
    if (!resource_id) return res.status(400).send({'message': 'Invalid resource ID'})
    
    req.gun.get(resource_id).open(function (data) {        
        if (!data) return res.status(404).send()
        res.send(data)
    })
}

module.exports.getReviews = async (req, res, next) => {    
    const resource_id = req.params['resourceId']
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
    const topic = req.params['topic']
    const title = req.params['title']
    const url = req.params['url']    

    db.addResource2Topic(topic_title, title, url)

    res.send(204)
}

module.exports.postReview = async (req, res, next) => {
    const resource_id = req.params['resource_id']
    const quality = req.params['quality']
    const length = req.params['length']
    const dependencies = req.params['dependencies']
    const content = req.params['content']    
    
    db.addReview2Resource(review_id, resource_id, quality, length, dependencies, content)

    res.send(204)
}
