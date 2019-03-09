require('bullet-catcher')

const Gun = require('gun')
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()
const bodyParser = require('body-parser')

function validate(msg) {
    // TODO
    return true
}

/*
const server = require('http').createServer((req, res) => {
    // filters gun requests!
    if (Gun.serve(req, res)) {
        return
    }
    res.writeHead(404, {"Content-Type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
})
*/
  

app.use(Gun.serve)

app.use(cors())


const port = process.env.PORT || 8090
//server.listen(process.env.PORT || 8090)

const server = app.listen(port)

// Pass the validation function as isValid
const gun = Gun({
    web: server,
    isValid: validate
})

// Sync everything
gun.on('out', {get: {'#': {'*': ''}}})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(function (req, res, next) {    
    req.gun = gun
    next()
})

app.get('/topics', routes.getTopics)
app.get('/resources/:resource_id', routes.getResource)
app.get('/resources/:resource_id/reviews', routes.getReviews)
app.post('/resources', routes.postResource)
app.post('/resources/:resource_id/reviews/:review_id', routes.postReview)
app.get('/search', routes.search)
app.get('/topics/:topic_id/resources', routes.getResources)

console.log('listening on port ' + port);
