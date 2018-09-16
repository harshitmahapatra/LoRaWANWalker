import { Gpio } from "onoff";

//Initialize Sensors
//LEDs
let redLed = new Gpio(4, 'out');
redLed.writeSync(1);
let yellowLed = new Gpio(22, 'out');
yellowLed.writeSync(1);
let greenLed = new Gpio(2, 'out');
greenLed.writeSync(1);

//PIR
let pir = new Gpio(17, 'in', 'both');

//DHT
let sensorLib = require('node-dht-sensor');
sensorLib.initialize(22, 12); //#A

function GetLEDByColor(color: string): any {
    let led: Gpio;
    if (color == 'red') {
        led = redLed;
    } else if (color == 'yellow') {
        led = yellowLed;
    } else {
        led = greenLed;
    }
    return led;
}

function TakeTemperature() : number{
    return sensorLib.read().temperature.toFixed(2);
}

function TakeHumidity() : number{
    return sensorLib.read().humidity.toFixed(2);
}

function TakePIR() : number{
    return pir.readSync();
}

export { GetLEDByColor, TakeTemperature, TakeHumidity, TakePIR}