"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var onoff_1 = require("onoff");
//Initialize Sensors
//LEDs
var redLed = new onoff_1.Gpio(4, 'out'); //#B
redLed.writeSync(1);
var yellowLed = new onoff_1.Gpio(2, 'out'); //#B
yellowLed.writeSync(1);
var greenLed = new onoff_1.Gpio(22, 'out'); //#B
greenLed.writeSync(1);
//PIR
var pir = new onoff_1.Gpio(17, 'in', 'both'); //#A
//DHT
//DHT
var sensorLib = require('node-dht-sensor');
sensorLib.initialize(22, 12); //#A
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.routes = function (app) {
        app.route('/')
            .get(function (req, res) {
            res.status(200).send({
                message: 'Welcome to India\'s Raspberry Pi!'
            });
        });
        app.route('/led')
            .get(function (req, res) {
            res.status(200).send({
                message: 'LED page'
            });
        });
        app.route('/led/:color')
            .get(function (req, res) {
            var color = req.params.color;
            res.status(200).send({
                message: "Hello, " + color
            });
        });
        app.route('/pir')
            .get(function (req, res) {
            res.status(200).send({
                message: 'Show pir info'
            });
        });
        app.route('/dht')
            .get(function (req, res) {
            res.status(200).send({
                message: 'DHT page'
            });
        });
    };
    return Routes;
}());
exports.Routes = Routes;
