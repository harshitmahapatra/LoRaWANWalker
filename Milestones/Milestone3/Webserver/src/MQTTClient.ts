import * as mqtt from 'mqtt';
import m from './model/model';

export class MQTTClient  {
    private client: mqtt.MqttClient;

    constructor(url: string) {
        this.client = mqtt.connect(url);
        this.config();
    }

    private config() : void {
        this.client.on('connect', () => {
            console.log('successfully connected to broker');
    
            this.client.subscribe('pi/sensors/pir123');
            this.client.subscribe('pi/sensors/temperature');
            this.client.subscribe('pi/sensors/humidity');
        })
    
        this.client.on('message', (topic: string, message: string) => {
            console.log(message.toString());
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
            m.SetPir(message);
            break;
        case 'pi/sensors/temperature':
            m.SetTemperature(message);
            break;
        case 'pi/sensors/humidity':
            m.SetHumidity(message);
            break;

        default:
            console.log('we don\'t care about this topic');
            break;
    }
}



// setTimeout(() => {
    // ChangeLedState('green', true);
    // ChangeLedState('red', true);
    // ChangeLedState('yellow', true);
// }, 2000);