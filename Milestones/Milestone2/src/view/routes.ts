import { Request, Response, Application } from "express";
import * as m from "../model/model";

var redLed = m.getRedLed();
var yellowLed = m.getYellowLed();
var greenLed = m.getGreenLed();

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
                let stateRedRed = m.GetLEDInfo(redLed);
                let stateYellowRed = m.GetLEDInfo(yellowLed);
                let stateGreenRed = m.GetLEDInfo(greenLed);
                res.status(200).send({
                    message: `LED page \n Red LED: ${stateRedRed} \n Yellow LED: ${stateYellowRed} \n Red LED: ${stateGreenRed}`
                })
            })

        app.route('/led/:color')
        .get((req: Request, res: Response) => {
                let { color } = req.params.color;
                let ledStatus : String = m.GetLEDInfoByColor(color);

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
            m.SetLEDState(m.GetLEDByColor(color), ledState)

            res.status(200).send({
                message: `Changed ${color} LED state to ${ledParam}`
            })
        })

        app.route('/pir')
            .get((req: Request, res: Response) => {
                let pirSensorStatus : String = m.GetPIRInfo();
                res.status(200).send({
                    message: pirSensorStatus
                })
            })

        app.route('/dht')
            .get((req: Request, res: Response) => {
                let dhtSensorTempera : String = m.GetDHTInfo().Temperature
                let dhtSensorHumidity : String = m.GetDHTInfo().Humidity
                res.status(200).send({
                    message: `Temperature: ${m.GetDHTInfo().Temperature} | Humidity: ${m.GetDHTInfo().Humidity}`
                })
            })
        
        app.route('/dht/:option')
        .get((req: Request, res: Response) => {
                let option = req.params.option;
                let ledStatus : String = m.GetDHTInfoFromText(option);
                res.status(200).send({
                    message: ledStatus
                })
            })
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