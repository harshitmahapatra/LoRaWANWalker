import { Gpio } from "onoff";

//Initialize Sensors
//LEDs
var redLed = new Gpio(4, 'out');
redLed.writeSync(1);
var yellowLed = new Gpio(22, 'out');
yellowLed.writeSync(1);
var greenLed = new Gpio(2, 'out'); 
greenLed.writeSync(1);
//PIR
var pir = new Gpio(17, 'in', 'both');
//DHT
var sensorLib = require('node-dht-sensor');
sensorLib.initialize(22, 12); //#A

function GetRedLed(){
    return redLed;
}

function GetYellowLed(){
    return redLed;
}
function GetGreenLed(){
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

function GetLEDInfoByColor(color: string): string {
    return GetLEDInfo(GetLEDByColor(color));
}

function GetLEDInfo(led: Gpio) : string {
    var ledState = led.readSync();
    return ledState ? "ON" : "OFF";
}

function SetLEDState(led: Gpio, state : number) : void {
    led.writeSync(state);
}


function GetPIRInfo() : string {
    return pir.readSync() ? "Movement" : "No Movement";
}

function GetDHTInfo() : any {
    var readout = sensorLib.read();

    return {
        Temperature: readout.temperature.toFixed(2),
        Humidity: readout.humidity.toFixed(2)
    }
}

function GetDHTInfoFromText(option: string) : number {
    let dhtInfo = GetDHTInfo();
    if (option == "temperature") {
        return dhtInfo.Temperature;
    } else if (option == "humidity") {
        return dhtInfo.Humidity;
    } else {
        return -1;
    }
}

export { GetRedLed, GetYellowLed, GetGreenLed, GetLEDInfo, GetLEDInfoByColor, SetLEDState, GetLEDByColor, GetPIRInfo, GetDHTInfo, GetDHTInfoFromText};