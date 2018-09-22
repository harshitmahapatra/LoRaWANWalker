import * as path from 'path';
import * as WebSocket from 'ws';
import { createServer } from 'http';
import express = require('express');
// import { MQTTClient } from "./MQTTClient";
import * as mqtt from 'mqtt';
import m from './model/model';

const PORT = process.env.port || 8080;
const localBroker = 'mqtt://localhost:8081';
const testBroker = 'mqtt://test.mosquitto.org';
const cloudBroker = 'mqtt://35.204.82.222';

console.log('connecting to broker at ' + cloudBroker);
//create connection to broker
const client = mqtt.connect(cloudBroker);
const app = express();
const server = createServer(app);
const wss = new WebSocket.Server({ server });

let pirSubs : WebSocket[] = [];
let tempSubs : WebSocket[] = [];
let humSubs : WebSocket[] = [];
let redLedSubs : WebSocket[] = [];
let greenLedSubs : WebSocket[] = [];
let yellowLedSubs : WebSocket[] = [];

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
})
app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.js'));
})

wss.on('connection', (ws: WebSocket, req: Request) => {
    console.log('new Websocket connection for resource: ' + req.url);
    AddSub(req.url,ws);

    ws.on('message', (message: string) => {
        console.log('new Websocket message: ' + message);
        console.log('new led state: ' + JSON.parse(message).value ? 'ON' : 'OFF');
        ChangeLedState()
        //publish change to broker
    })
})


client.on('connect', () => {
    console.log('successfully connected to broker');
    client.subscribe('/pi/sensors/pir');
    client.subscribe('/pi/sensors/temperature');
    client.subscribe('/pi/sensors/humidity');
    client.subscribe('/pi/actuators/leds/red');
    client.subscribe('/pi/actuators/leds/yellow');
    client.subscribe('/pi/actuators/leds/green');
})

client.on('message', (topic: string, message: string) => {
    DelegateMessage(topic, JSON.parse(message));
})

function DelegateMessage(topic: string, info: JSON) {

    switch (topic) {
        case '/pi/sensors/pir':
            UpdatePir(info);
            break;
        case '/pi/sensors/temperature':
            UpdateTemperature(info);
            break;
        case '/pi/sensors/humidity':
            UpdateHumidity(info);
            break;

        default:
            if (path.dirname(topic) == '/pi/actuators/leds') {
                UpdateLed(path.basename(topic), info);
            }
            break;
    }
}

function SendInfo(subList: Array<WebSocket>, info: JSON) {
    subList.forEach((ws) => {
        ws.send(JSON.stringify(info));
    })
}

function UpdatePir(info: JSON) {
    SendInfo(pirSubs, info);
    m.SetPir(info);
}

function UpdateTemperature(info: JSON) {
    SendInfo(tempSubs, info);
    m.SetTemperature(info);
}

function UpdateHumidity(info: JSON) {
    SendInfo(humSubs, info);
    m.SetHumidity(info);
}

function UpdateLed(color:string, info: JSON) {
    switch (color) {
        case 'red':
            SendInfo(redLedSubs, info);
            m.SetRedLed(info);
            break;
        case 'green':
            SendInfo(greenLedSubs, info);
            m.SetGreenLed(info);
            break;
        case 'yellow':
            SendInfo(yellowLedSubs, info);
            m.SetYellowLed(info);
            break;
    
        default:
            break;
    }
}

function ChangeLedState(led: string, value: boolean) {
    let info: string = JSON.stringify({ "value": value });
    client.publish('/pi/actuators/leds/update/' + led, info);
}

function AddSub(url: string, ws: WebSocket) {
    console.log('AddSub URL: ' + url)
    switch (url) {
        case '/pi/sensors/pir':
            pirSubs.push(ws);
            break;
        case '/pi/sensors/temperature':
            tempSubs.push(ws);
            break;
        case '/pi/sensors/humidity':
            humSubs.push(ws);
            break;
        case '/pi/actuators/leds/red':
            redLedSubs.push(ws);
            break;
        case '/pi/actuators/leds/yellow':
            yellowLedSubs.push(ws);
            break;
        case '/pi/actuators/leds/green':
            greenLedSubs.push(ws);
            break;

        default:
            break;
    }
}