import { Gpio } from "onoff";

//Initialize Sensors
//LEDs
let redLed = new Gpio(4, 'out');
redLed.writeSync(1);
let yellowLed = new Gpio(22, 'out');
yellowLed.writeSync(1);
let greenLed = new Gpio(2, 'out'); 
greenLed.writeSync(1);
let ledList: Array<Gpio> = [redLed, yellowLed, greenLed];

//PIR
let pir = new Gpio(17, 'in', 'both');

//DHT
let sensorLib = require('node-dht-sensor');
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

function GetLEDInfoByColor(color: string){
    return {
        "name" : color + "LED",
        "color" : color,
        "value": GetLEDInfo(GetLEDByColor(color)),
        "type": 'boolean',
        "description": "Status of the " +color+ "LED"
    }
}

function GetLEDInfo(led: Gpio) : number{
    return led.readSync();
}

function GetAllLEDInfo() {
    return {
        "name": "LEDs",
        "description": "LEDs on the device",
        "LEDs" : {
            "Red LED" : GetLEDInfo(redLed),
            "Green LED" : GetLEDInfo(yellowLed),
            "Yellow LED" : GetLEDInfo(greenLed)
        }
    }
}

function SetLEDState(led: Gpio, state : number) : void {
    led.writeSync(state);
}


function GetPIRInfo() {
    return {
        'name': "Passive Infrared",
        'description': "A passive infrared sensor.",
        'type': "boolean",
        'value': pir.readSync() == 1 ? true : false,
        'gpio': 17
    }
}

function GetTemperature(){
    let temperature = sensorLib.read().temperature.toFixed(2)
    return {
        'name' : 'Temperature sensor',
        'description' : 'Measures the temperature',
        'type': "float",
        'units' : 'Celcius',
        'value' : temperature
    }
}

function GetHumidity() {
    let humidity = sensorLib.read().humidity.toFixed(2)
    return {
        'name': 'Humidity sensor',
        'description': 'Measures the humidity',
        'type': "float",
        'unit': "percent",
        'value': humidity
    }
}

function GetDHTInfo(){
    return sensorLib.read();

    return {
        Temperature: GetTemperature(),
        Humidity: GetHumidity()
    }
}

function GetSensorData(){
    return {
        'temperature' : GetTemperature(),
        'humidity' : GetHumidity(),
        'pir' : GetPIRInfo(),
    }
}

export { 
    GetAllLEDInfo, GetSensorData, GetTemperature, GetHumidity, 
    GetRedLed, GetYellowLed, GetGreenLed, GetLEDInfo, GetLEDInfoByColor, 
    SetLEDState, GetLEDByColor, GetPIRInfo, GetDHTInfo
};
