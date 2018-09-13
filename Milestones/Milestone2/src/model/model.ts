import { Request, Response, Application } from "express";
import { Gpio } from "onoff";

//Initialize Sensors
//LEDs
var redLed = new Gpio(4, 'out'); //#B
redLed.writeSync(1);
var yellowLed = new Gpio(22, 'out'); //#B
yellowLed.writeSync(1);
var greenLed = new Gpio(2, 'out'); //#B
greenLed.writeSync(1);
//PIR
var pir = new Gpio(17, 'in', 'both');    //#A
//DHT
var sensorLib = require('node-dht-sensor');
sensorLib.initialize(22, 12); //#A

function getRedLed(){
    return redLed;
}

function getYellowLed(){
    return redLed;
}
function getGreenLed(){
    return redLed;
}


function GetLEDByColor(color : string) : any{
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

function GetLEDInfoByColor(color: string):String {
    return GetLEDInfo(GetLEDByColor(color));
}

function GetLEDInfo(led: Gpio) : String {
    var ledState = led.readSync();
    return ledState ? "ON" : "OFF";
}

function SetLEDState(led: Gpio, state : number) : void {
    led.writeSync(state);
}


function GetPIRInfo() : String {
    return pir.readSync() ? "Movement" : "No Movement";
}

function GetDHTInfo() : any {
    var readout = sensorLib.read();

    return {
        Temperature: readout.temperature.toFixed(2),
        Humidity: readout.humidity.toFixed(2)
    }
}

function GetDHTInfoFromText(option: string) : any {
    let dhtInfo = GetDHTInfo();
    if (option == "temperature") {
        return `Temperature ${dhtInfo.Temperature}`;
    } else if (option == "humidity") {
        return `Humidity ${dhtInfo.Humidity}`;
    }
}

export { getRedLed, getYellowLed, getGreenLed, GetLEDInfo, GetLEDInfoByColor, SetLEDState, GetLEDByColor, GetPIRInfo, GetDHTInfo, GetDHTInfoFromText};