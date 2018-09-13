import { Request, Response, Application } from "express";

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
                res.status(200).send({
                    message: 'LED page'
                })
            })

        app.route('/led/:color')
        .get((req: Request, res: Response) => {
                let { color } = req.params;
                res.status(200).send({
                    message: `Hello, ${color}`
                })
            })

        app.route('/pir')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'Show pir info'
                })
            })

        app.route('/dht')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'DHT page'
                })
            })
    }
}