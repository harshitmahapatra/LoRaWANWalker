'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

//Initialize Sensors
//LED
var LEDGpio = require('onoff').Gpio;
var led = new LEDGpio(4, 'out'); //#B
led.writeSync(1);

//PIR
var PIRGpio = require('onoff').Gpio;
var pir = new PIRGpio(17, 'in', 'both');    //#A

//DHT
var sensorLib = require('node-dht-sensor');
sensorLib.initialize(22, 12); //#A


app.get('/', (req, res) => {
  res.send(JSON.stringify(GetSensorInfo()));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);



// Functions for getting sensor data 
function GetSensorInfo() {
  return {
    led: GetLEDInfo(),
    pir: GetPIRInfo(),
    dht: GetDHTInfo()
  };
}

function GetLEDInfo() {
  var ledState = led.readSync();
  SwitchBlink();
  return ledState ? "ON" : "OFF";
}

function SwitchBlink() {
  var value = (led.readSync() + 1) % 2;
  led.writeSync(value);
}

function GetPIRInfo() {
  return pir.readSync() ? "Movement" : "No Movement";
}

function GetDHTInfo() {
  var readout = sensorLib.read();

  return {
    Temperature: readout.temperature.toFixed(2),
    Humidity: readout.humidity.toFixed(2)
  }
}
