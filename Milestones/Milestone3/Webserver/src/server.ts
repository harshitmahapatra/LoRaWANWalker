import * as path from 'path';
import express = require('express');
import { MQTTClient } from "./MQTTClient";

const PORT = process.env.port || 8080;
const localBroker = 'mqtt://localhost:8081';
const testBroker = 'mqtt://test.mosquitto.org';
const cloudBroker = 'mqtt://mqtt-broker-216922.appspot.com:8080';

console.log('connecting to broker at ' + localBroker);
//create connection to broker
const client = new MQTTClient(localBroker);
const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
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


