const Gun = require('gun')
require('bullet-catcher')

function validate(msg) {
    // TODO
    return true
}

const server = require('http').createServer()

// Pass the validation function as isValid
const gun = Gun({
    file: 'data.json',
    web: server,
    isValid: validate
})

// Sync everything
gun.on('out', {get: {'#': {'*': ''}}})

server.listen(process.env.PORT || 8080)
