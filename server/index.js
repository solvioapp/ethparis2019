require('bullet-catcher')

const Gun = require('gun')
const express = require('express')
const reviews = require('./reviews')
const app = express()

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


app.use(function (req, res, next) {
    console.log('add gun')
    req.gun = gun
    next()
})

app.get('/reviews', reviews.get)


console.log('listening on port ' + port);
