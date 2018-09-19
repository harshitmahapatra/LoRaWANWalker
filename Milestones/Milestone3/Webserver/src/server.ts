import * as mqtt from 'mqtt';

console.log('lets connect to broker...')
//create connection to broker
const client = mqtt.connect('mqtt://localhost:8081');

client.on('connect', () => {
    console.log('successfully connected to broker');

    client.subscribe('pi/sensors/pir');
    client.subscribe('pi/sensors/temperature');
    client.subscribe('pi/sensors/humidity');
})

client.on('message', (topic: string, message : string) => {
    DelegateMessage(topic, JSON.parse(message));
})

function DelegateMessage(topic: string, message : JSON) {
    switch (topic) {
        case 'pi/sensors/pir':
            UpdatePir(message);
            break;
        case 'pi/sensors/temperature':
            UpdateTemperature(message);
            break;
        case 'pi/sensors/humidity':
            UpdateHumidity(message);
            break;
    
        default:
            console.log('we don\'t care about this topic');
            break;
    }
}

function UpdatePir(info : any) {
    console.log('PIR is%s detecting movement', info.value ? '' : ' not');
}
function UpdateTemperature(info : any) {
    console.log('Current Temperature: %s degrees %s', info.value, info.unit);
}
function UpdateHumidity(info : any) {
    console.log('Current Humidity: %s%s', info.value, info.unit);
}

function ChangeLedState(led : string, value : boolean) {
    let info: string = JSON.stringify({ "value": value });
    client.publish('pi/actuators/leds/' + led, info);
}

// setTimeout(() => {
    // ChangeLedState('green', true);
    // ChangeLedState('red', true);
    //ChangeLedState('yellow', true);
// }, 2000);