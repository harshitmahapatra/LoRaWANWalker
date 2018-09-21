import * as mqtt from 'mqtt';

export class MQTTClient  {
    private client: mqtt.MqttClient;

    constructor(url: string) {
        this.client = mqtt.connect(url);
        this.config();
    }

    private config() : void {
        this.client.on('connect', () => {
            console.log('successfully connected to broker');
    
            this.client.subscribe('pi/sensors/pir');
            this.client.subscribe('pi/sensors/temperature');
            this.client.subscribe('pi/sensors/humidity');
        })
    
        this.client.on('message', (topic: string, message: string) => {
            DelegateMessage(topic, JSON.parse(message));
        })
    }

    public ChangeLedState(led: string, value: boolean) {
        let info: string = JSON.stringify({ "value": value });
        this.client.publish('pi/actuators/leds/' + led, info);
    }
}


function DelegateMessage(topic: string, message: JSON) {
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

function UpdatePir(info: any) {
    console.log('PIR is%s detecting movement', info.value ? '' : ' not');
}
function UpdateTemperature(info: any) {
    console.log('Current Temperature: %s degrees %s', info.value, info.unit);
}
function UpdateHumidity(info: any) {
    console.log('Current Humidity: %s%s', info.value, info.unit);
}





// setTimeout(() => {
    // ChangeLedState('green', true);
    // ChangeLedState('red', true);
    // ChangeLedState('yellow', true);
// }, 2000);