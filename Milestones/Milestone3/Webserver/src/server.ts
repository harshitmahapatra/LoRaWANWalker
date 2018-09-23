import * as path from 'path';
import * as WebSocket from 'ws';
import { createServer } from 'http';
import express = require('express');
import * as mqtt from 'mqtt';
import m from './model/model';

const PORT = process.env.port || 8080;
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
    let resource: string = req.url;
    NewSub(resource, ws);

    ws.on('message', (info: string) => {
        client.publish('/pi/actuators/leds/update/' + path.basename(resource), info);
    })
})

client.on('connect', () => {
    console.log('Successfully connected to broker');
    client.subscribe('/pi/sensors/pir');
    client.subscribe('/pi/sensors/temperature');
    client.subscribe('/pi/sensors/humidity');
    client.subscribe('/pi/actuators/leds/red');
    client.subscribe('/pi/actuators/leds/yellow');
    client.subscribe('/pi/actuators/leds/green');
    setInterval(SendAllInfo, 200);
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

function SendAllInfo() {
    SendPir();
    SendTemperature();
    SendHumidity();
    SendRedLed();
    SendYellowLed();
    SendGreenLed();
}

//publish new states to relevant websockets
function SendInfo(subList: Array<WebSocket>, info: JSON) {
    subList.forEach((ws: WebSocket, index: number) => {
        try {
            ws.send(JSON.stringify(info));
        } catch (error) {
            subList.splice(index, 1)   
        }
    })
}

function UpdatePir(info: JSON) {
    m.SetPir(info);
}

function SendPir() {
    SendInfo(pirSubs, m.GetPir());
}

function UpdateTemperature(info: JSON) {
    m.SetTemperature(info);
}

function SendTemperature() {
    SendInfo(tempSubs, m.GetTemperature());
}

function UpdateHumidity(info: JSON) {
    m.SetHumidity(info);
}

function SendHumidity() {
    SendInfo(humSubs, m.GetHumidity());
}

function UpdateLed(color:string, info: JSON) {
    switch (color) {
        case 'red':
            m.SetRedLed(info);
            break;
        case 'green':
            m.SetGreenLed(info);
            break;
        case 'yellow':
            m.SetYellowLed(info);
            break;
    
        default:
            break;
    }
}

function SendRedLed() {
    SendInfo(redLedSubs, m.GetRedLed());
}

function SendYellowLed() {
    SendInfo(yellowLedSubs, m.GetYellowLed());
}

function SendGreenLed() {
    SendInfo(greenLedSubs, m.GetGreenLed());
}

function NewSub(url: string, ws: WebSocket) {
    switch (url) {
        case '/pi/sensors/pir':
            pirSubs.push(ws);
            SendPir();
            break;
        case '/pi/sensors/temperature':
            tempSubs.push(ws);
            SendTemperature();
            break;
        case '/pi/sensors/humidity':
            humSubs.push(ws);
            SendHumidity();
            break;
        case '/pi/actuators/leds/red':
            redLedSubs.push(ws);
            SendRedLed();
            break;
        case '/pi/actuators/leds/yellow':
            yellowLedSubs.push(ws);
            SendYellowLed();
            break;
        case '/pi/actuators/leds/green':
            greenLedSubs.push(ws);
            SendGreenLed();
            break;

        default:
            break;
    }
}