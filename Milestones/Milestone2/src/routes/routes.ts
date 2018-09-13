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

export class Routes {
    public routes(app : Application): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'Welcome to India\'s Raspberry Pi!'
                })
            })

        app.route('/led')
            .get((req: Request, res: Response) => {
                let stateRedRed = GetLEDInfo(redLed);
                let stateYellowRed = GetLEDInfo(yellowLed);
                let stateGreenRed = GetLEDInfo(greenLed);
                res.status(200).send({
                    message: `LED page \n Red LED: ${stateRedRed} \n Yellow LED: ${stateYellowRed} \n Red LED: ${stateGreenRed}`
                })
            })

        app.route('/led/:color')
        .get((req: Request, res: Response) => {
                let { color } = req.params.color;
                let ledStatus : String = GetLEDInfoByColor(color);

                res.status(200).send({
                    message: ledStatus
                })
            })
        .post((req: Request, res: Response) => {
            let ledParam: string = req.query.state;
            let ledState : number;
            let color = req.params.color;
            if (ledParam == "ON") {
                ledState = 1;
            } else if (ledParam == "OFF") {
                ledState = 0;
            } else {
                res.status(400).send({
                    message: `${ledParam} is not a possible state for the LED`
                })
                return;
            }
            SetLEDState(GetLEDByColor(color), ledState)

            res.status(200).send({
                message: `Changed ${color} LED state to ${ledParam}`
            })
        })

        app.route('/pir')
            .get((req: Request, res: Response) => {
                let pirSensorStatus : String = GetPIRInfo();
                res.status(200).send({
                    message: pirSensorStatus
                })
            })

        app.route('/dht')
            .get((req: Request, res: Response) => {
                let dhtSensorTempera : String = GetDHTInfo().Temperature
                let dhtSensorHumidity : String = GetDHTInfo().Humidity
                res.status(200).send({
                    message: `Temperature: ${GetDHTInfo().Temperature} | Humidity: ${GetDHTInfo().Humidity}`
                })
            })
        
        app.route('/dht/:option')
        .get((req: Request, res: Response) => {
                let option = req.params.option;
                let ledStatus : String = GetDHTInfoFromText(option);
                res.status(200).send({
                    message: ledStatus
                })
            })
    }
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



// function SwitchBlink(led: Gpio) {
//     var value = (led.readSync() + 1) % 2;
//     led.writeSync(value);
// }

// // Functions for getting sensor data 
// function GetSensorInfo() {
//     return {
//         led: GetLEDInfo(redLed),
//         pir: GetPIRInfo(),
//         dht: GetDHTInfo()
//     };
// }