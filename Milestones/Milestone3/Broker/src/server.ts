import * as mosca from 'mosca';


console.log('starting mosca server...');

let server = new mosca.Server({});

server.on('clientConnected', function (client : mosca.Client) {
    console.log('client connected', client.id);
});

server.on('clientDisconnected', function (client: mosca.Client) {
    console.log('client disconnected', client.id);
});

server.on('ready', () => {
    console.log('Mosca server is up and running');
});
