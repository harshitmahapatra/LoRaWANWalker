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
    DelegateMessage(topic, message);
})

function DelegateMessage(topic: string, message: string) {
    switch (topic) {
        case 'pi/sensors/pir':
            UpdatePir(JSON.parse(message));
            break;
        case 'pi/sensors/temperature':
            UpdateTemperature(JSON.parse(message));
            break;
        case 'pi/sensors/humidity':
            UpdateHumidity(JSON.parse(message));
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