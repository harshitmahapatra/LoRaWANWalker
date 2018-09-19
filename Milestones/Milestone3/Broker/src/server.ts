import * as mosca from 'mosca';
import { Packet } from 'mosca';

const PORT = 8081;

let server = new mosca.Server( {
    port: PORT
})

server.on('clientConnected', function (client : mosca.Client) {
    console.log('client connected', client.id);
});

server.on('clientDisconnected', function (client: mosca.Client) {
    console.log('client disconnected', client.id);
});

server.on('published', function (packet : mosca.Packet, client: mosca.Client) {
    console.log(packet);
});

server.on('subscribed', function (topic, client: mosca.Client) {
    console.log('subscribed: ' + client.id);
});

server.on('unsubscribed', function (topic, client: mosca.Client) {
    console.log('unsubscribed: ' + client.id);
});

server.on('ready', function () {
    console.log('Mosca server is up and running');
});
