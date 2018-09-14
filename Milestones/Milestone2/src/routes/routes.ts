import { Request, Response, Application } from "express";
import * as m from "../model/model";

var redLed = m.GetRedLed();
var yellowLed = m.GetYellowLed();
var greenLed = m.GetGreenLed();

export class Routes {
    
    public routes(app : Application): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).redirect('/pi');
            })

        app.route('/pi')
            .get((req: Request, res: Response) => {
                res.status(200).render('index');
            })

        app.route('/pi/actuators')
            .get((req: Request, res: Response) => {
                let ledInfo = m.GetAllLEDInfo()
                if (IsJson(req)) {
                    return ledInfo;
                } else {
                    res.status(200).render('actuators');
                }
            })


        app.route('/pi/actuators/leds')
            .get((req: Request, res: Response) => {
                let ledInfo = m.GetAllLEDInfo()
                if (IsJson(req)) {
                    return ledInfo;
                } else {
                    res.status(200).render('leds', { "ledInfo": ledInfo});
                }
            })

        app.route('/pi/actuators/leds/:color')
        .get((req: Request, res: Response) => {
                let color : string = req.params.color;
                let ledInfo = m.GetLEDInfoByColor(color);
                if (IsJson(req)) {
                    return ledInfo;
                }
                res.status(200).render('led_specific', {
                    'color' : color,
                    'ledStatus': ledInfo.value ? "ON" : "OFF",
                    'url': req.url
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

        app.route('/pi/sensors')
            .get((req: Request, res: Response) => {
                let sensorData = m.GetSensorData();
                if (IsJson(req)) {
                    res.status(200).send(sensorData);
                } else {
                    res.status(200).render('sensors', { 'sensorData': sensorData});
                }
            })

        app.route('/pi/sensors/pir')
            .get((req: Request, res: Response) => {
                let pir = m.GetPIRInfo();
                if (IsJson(req)) {
                    res.status(200).send(pir);
                } else {
                    res.status(200).render('pir', { 'pir': pir});
                }
            })

        app.route('/pi/sensors/humidity')
            .get((req: Request, res: Response) => {
                let humidity = m.GetHumidity();
                if (IsJson(req)) {
                    res.status(200).send(humidity);
                } else {
                    res.status(200).render('humidity', { 'humidity' : humidity });
                }
            })

        app.route('/pi/sensors/temperature')
            .get((req: Request, res: Response) => {
                let temperature = m.GetTemperature();
                if (IsJson(req)) {
                    res.status(200).send(temperature);
                } else {
                    res.status(200).render('temperature', { 'temperature' : temperature });
                }
            })
    }
}

function IsJson(req: Request) {
    let header: string = String(req.get('Accept'));
    return header.includes('application/json');
}