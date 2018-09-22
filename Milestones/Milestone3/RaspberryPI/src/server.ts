import * as mqtt from 'mqtt'
import * as m from './resources/model';
import * as path from 'path';

let endpoint = 'mqtt://192.168.0.160:8081';
let cloudBroker = 'mqtt://35.204.82.222';
console.log('connecting to broker at ' + cloudBroker);

//create connection to broker
const client = mqtt.connect(cloudBroker);

SubscribeLEDs();
setInterval(PublishAllInfo, 5000);

function SubscribeLEDs(){
    client.subscribe('/pi/actuators/leds/update/red');
    client.subscribe('/pi/actuators/leds/update/green');
    client.subscribe('/pi/actuators/leds/update/yellow');
    console.log('subscribed to leds');
}

client.on('message', (topic: string, message: string) => {
    console.log('Got message on topic %s:%s', topic, message)
    DelegateMessage(topic, JSON.parse(message));
})


function DelegateMessage(topic: string, message: JSON) {
    console.log(path.dirname(topic))
    if (path.dirname(topic) == '/pi/actuators/leds/update') {
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
    m.SetLEDState('red', 1);
    console.log('sending sensor info to broker');
    PublishPirInfo();
    PublishTemperatureInfo();
    PublishHumidityInfo();
    PublishLEDInfo();
}

function PublishPirInfo() {
    client.publish('/pi/sensors/pir', JSON.stringify(m.GetPIRInfo()));
}

function PublishTemperatureInfo() {
    client.publish('/pi/sensors/temperature', JSON.stringify(m.GetTemperature()));
}

function PublishHumidityInfo() {
    client.publish('/pi/sensors/humidity', JSON.stringify(m.GetHumidity()));
}

function PublishLEDInfo() {
    client.publish('/pi/actuators/leds/red', JSON.stringify(m.GetLEDInfo('red')));
    client.publish('/pi/actuators/leds/green', JSON.stringify(m.GetLEDInfo('green')));
    client.publish('/pi/actuators/leds/yellow', JSON.stringify(m.GetLEDInfo('yellow')));
}

