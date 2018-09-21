import * as path from 'path';
import * as websocket from 'ws';
import {createServer} from 'http';
import express = require('express');
import { MQTTClient } from "./MQTTClient";

const PORT = process.env.port || 8080;
const localBroker = 'mqtt://localhost:8081';
const testBroker = 'mqtt://test.mosquitto.org';
const cloudBroker = 'mqtt://35.204.82.222';

console.log('connecting to broker at ' + cloudBroker);
//create connection to broker
const client = new MQTTClient(cloudBroker);
const app = express();
const server = createServer(app);
const wss = new websocket.Server({server});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
})
app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.js'));
})

app.post('/pi/actuators/leds/:color', (req, res) => {
    let color = req.params.color;
    let stateParam: string = req.query.state;
    let newState: boolean;
    if (stateParam == "ON") {
        newState = true;
    } else if (stateParam == "OFF") {
        newState = false;
    } else {
        res.status(400).send({
            message: `${stateParam} is not a possible state for the LED`
        })
        return;
    }
    client.ChangeLedState(color, newState);
})

wss.on('connection', (ws: WebSocket, req: Request) => {
    console.log('new Websocket connection for resource: ' + req.url);

    // let desiredResource: string = req.url;
    // SelectResouce(desiredResource);

    // setInterval(() => {
    //     SelectResouce(desiredResource);
    //     console.log(data);
    //     try {
    //         ws.send(data)
    //     } catch (error) {
    //         ws.close();
    //     }
    // }, 500);
})

