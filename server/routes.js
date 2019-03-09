require('gun/lib/open.js')
require('gun/lib/then.js')

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
