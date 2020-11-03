const WebSocket = require('ws');


const webSocketServer = new WebSocket.Server({ port: 4000 });

webSocketServer.on('connection', webSocket => {
  webSocket.on('message', message => {
    console.log('Recibido:', message);
    broadcast(message);
  });
});

function broadcast(data) {
  webSocketServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}