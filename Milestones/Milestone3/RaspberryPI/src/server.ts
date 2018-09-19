import * as mqtt from 'mqtt'
import * as m from './resources/model';
import * as path from 'path';

let endpoint = 'mqtt://192.168.0.160:8081';
let testEndpoing = 'mqtt://est.mosquitto.org';
console.log('connecting to broker at ' + endpoint);

//create connection to broker
const client = mqtt.connect(endpoint);


client.on('connect', () => {
    console.log('successfully connected to broker');

    setInterval(PublishAllInfo, 2000);
    SubscribeLEDs();
})

function SubscribeLEDs(){
    client.subscribe('pi/actuators/leds/red');
    client.subscribe('pi/actuators/leds/green');
    client.subscribe('pi/actuators/leds/yellow');
    console.log('subscribed to leds');
}

client.on('message', (topic: string, message: string) => {
    console.log('Got message on topic %s:%s ', topic, message)
    DelegateMessage(topic, JSON.parse(message));
})

function DelegateMessage(topic: string, message: JSON) {
    console.log(path.dirname(topic))
    if (path.dirname(topic) == 'pi/actuators/leds') {
        UpdateLed(path.basename(topic), message);
    } else {
        console.log('didn\'t recognize topic');
    }
}

function UpdateLed(color : string, info : any) {
    let colors = ['red', 'yellow', 'green'];
    console.log('checking color: ' + color);
    
    if (colors.indexOf(color) > -1) {
        console.log('changing led state');
        m.SetLEDState(color, info.value ? 1 : 0);
    }
}

function PublishAllInfo() {
    PublishPirInfo();
    PublishTemperatureInfo();
    PublishHumidityInfo();
}

function PublishPirInfo() {
    client.publish('pi/sensors/pir', JSON.stringify(m.GetPIRInfo()));
}

function PublishTemperatureInfo() {
    client.publish('pi/sensors/temperature', JSON.stringify(m.GetTemperature()));
}

function PublishHumidityInfo() {
    client.publish('pi/sensors/humidity', JSON.stringify(m.GetHumidity()));
}
