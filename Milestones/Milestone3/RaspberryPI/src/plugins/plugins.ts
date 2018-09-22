import { Gpio } from "onoff";

//Initialize Sensors
//LEDs
let redLed = new Gpio(4, 'out');
redLed.writeSync(0);
let yellowLed = new Gpio(22, 'out');
yellowLed.writeSync(0);
let greenLed = new Gpio(2, 'out');
greenLed.writeSync(0);

//PIR
let pir = new Gpio(17, 'in', 'both');

//DHT
let sensorLib = require('node-dht-sensor');
sensorLib.initialize(22, 12); //#A

function GetLEDByColor(color: string): Gpio {
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

function SetLedState(color: string, state: number): void{
    GetLEDByColor(color).writeSync(state);
}

function GetLedState(color: string){
    return GetLEDByColor(color).readSync();
}

function TakeTemperature() : number{
    let temperature = sensorLib.read().temperature.toFixed(2)
    return (temperature != 0) ? temperature : MockTemperature(); 
}

function TakeHumidity() : number{
    let humidity = sensorLib.read().humidity.toFixed(2)
    return (humidity != 0) ? humidity : MockHumidity(); 
}

function TakePIR() : number{
    return pir.readSync();
}

function MockTemperature() {
    return Math.floor(Math.random() * (40 - 18 + 1) + 18);
}

function MockHumidity() {
    return Math.floor(Math.random() * (70 - 20 + 1) + 20);
}

export { SetLedState, GetLedState, TakeTemperature, TakeHumidity, TakePIR}