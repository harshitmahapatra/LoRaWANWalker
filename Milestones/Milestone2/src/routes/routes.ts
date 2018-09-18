import { Request, Response, Application } from "express";
import * as m from "../resources/model";
import * as path from "path";
export class Routes {
    
    public routes(app : Application): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).redirect('/pi');
            })

        app.route('/pi')
            .get((req: Request, res: Response) => {
                res.status(200).render('index', { data: m.GetAllData() });
            })

        app.route('/pi/actuators')
            .get((req: Request, res: Response) => {
                let ledInfo = m.GetAllLEDInfo()
                if (IsHTML(req)) {
                    res.status(200).render('actuators');
                } else {
                    res.status(200).send(ledInfo);
                }
            })


        app.route('/pi/actuators/leds')
            .get((req: Request, res: Response) => {
                let ledInfo = m.GetAllLEDInfo()
                if (IsHTML(req)) {
                    res.status(200).render('leds', { "ledInfo": ledInfo});
                } else {
                    res.status(200).send(ledInfo);
                }
            })

        app.route('/pi/actuators/leds/:color')
        .get((req: Request, res: Response) => {
                let color : string = req.params.color;
                let ledInfo = m.GetLEDInfoByColor(color);
                if (IsHTML(req)) {
                    res.status(200).render('led_specific', {
                        'color' : color,
                        'ledStatus': ledInfo.value ? "ON" : "OFF",
                        'url': req.url
                    })
                } else{
                    res.status(200).send(ledInfo);
                }
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
            m.SetLEDState(color, ledState)
            res.status(200).redirect(req.url.split('?')[0])
        })

        app.route('/pi/sensors')
            .get((req: Request, res: Response) => {
                let sensorData = m.GetAllSensorData();
                if (IsHTML(req)) {
                    res.status(200).render('sensors', { 'sensorData': sensorData});
                } else {
                    res.status(200).send(sensorData);
                }
            })

        app.route('/pi/sensors/pir')
            .get((req: Request, res: Response) => {
                let pir = m.GetPIRInfo();
                if (IsHTML(req)) {
                    res.status(200).sendFile(path.join(__dirname + '/../views/pir.html'));
                } else {
                    console.log("NOT HTML");

                    res.status(200).send(pir);
                }
            })

        app.route('/pi/sensors/humidity')
            .get((req: Request, res: Response) => {
                let humidity = m.GetHumidity();
                if (IsHTML(req)) {
                    res.status(200).sendFile(path.join(__dirname + '/../views/humidity.html'));
                } else {
                    res.status(200).send(humidity);
                }
            })

        app.route('/pi/sensors/temperature')
            .get((req: Request, res: Response) => {
                let temperature = m.GetTemperature();
                if (IsHTML(req)) {
                    res.status(200).sendFile(path.join(__dirname + '/../views/temperature.html'));
                } else {
                    res.status(200).send(temperature);
                }
            })
    }
}

function IsHTML(req: Request) {
    let header: string = String(req.get('Accept'));
    return header.includes('text/html');
}