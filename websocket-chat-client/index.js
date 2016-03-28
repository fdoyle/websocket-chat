var WebSocket = require('ws');
var readline = require('readline');
var ws = new WebSocket('ws://localhost:3000/chat');
ws.on('open', function() {
    ws.send('user joined');
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('line', function(message) {
        ws.send(message);

    })

    ws.on('message', function(data, flags) {
        console.log(data);
    })
})
