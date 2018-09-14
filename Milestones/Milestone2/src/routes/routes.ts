import { Request, Response, Application } from "express";
import * as m from "../model/model";

var redLed = m.GetRedLed();
var yellowLed = m.GetYellowLed();
var greenLed = m.GetGreenLed();

export class Routes {
    
    public routes(app : Application): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).render('index');
            })

        app.route('/led')
            .get((req: Request, res: Response) => {
                res.status(200).render('led');
            })

        app.route('/led/:color')
        .get((req: Request, res: Response) => {
                let color : string = req.params.color;
                let ledStatus : string = m.GetLEDInfoByColor(color);
                res.status(200).render('led_specific', {
                    color : color,
                    ledStatus : ledStatus,
                    url: req.url
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
            res.status(200).redirect(req.url.split('?')[0])
        })

        app.route('/pir')
            .get((req: Request, res: Response) => {
                let pirSensorStatus : string = m.GetPIRInfo();
                res.status(200).render('pir', { status : pirSensorStatus });
            })

        app.route('/dht')
            .get((req: Request, res: Response) => {
                let dhtSensorTempera : string = m.GetDHTInfo().Temperature
                let dhtSensorHumidity : string = m.GetDHTInfo().Humidity
                res.status(200).render('dht')
            })
        
        app.route('/dht/:option')
        .get((req: Request, res: Response) => {
                let option = req.params.option;
                let sensorStatus : number = m.GetDHTInfoFromText(option);
                res.status(200).render('dht_specific', { 
                    option: option,
                    value : sensorStatus
                })
            })
    }
}
