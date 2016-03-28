var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

var clientSockets = new Set();

var chatWebSocketService;
app.ws('/chat', function(ws, req) {
    clientSockets.add(ws);

    ws.on('message', function(message) {
        console.log(message);
        chatWebSocketService.clients.forEach(function(client) {

            client.send(message);
        })
    });
    ws.on('close', function() {
        console.log('disconnected');
        clientSockets.delete(ws);
    })
});
chatWebSocketService = expressWs.getWss('/chat');

app.listen(3000);
