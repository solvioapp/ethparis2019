const Gun = require('gun')
require('bullet-catcher')

function validate(msg) {
    // TODO
    return true
}

const server = require('http').createServer((req, res) => {
    // filters gun requests!
    if (Gun.serve(req, res)) {
        return
    }
    res.writeHead(404, {"Content-Type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
})
  
// Pass the validation function as isValid
const gun = Gun({
    web: server,
    isValid: validate
})

// Sync everything
gun.on('out', {get: {'#': {'*': ''}}})

server.listen(process.env.PORT || 8090)
