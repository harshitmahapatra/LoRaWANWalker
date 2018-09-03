// Load the http module to create an http server.
var http = require('http');

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

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end(JSON.stringify(GetSensorInfo()));
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");



// The functions 
function GetSensorInfo(){
  info = {
    led : GetLEDInfo(),
    pir : GetPIRInfo(),
    dht : GetDHTInfo()
  }
  return info;
}

function GetLEDInfo(){
  var ledState = led.readSync();
  SwitchBlink();
  return ledState ? "ON" : "OFF";
}

function SwitchBlink() {
  var value = (led.readSync() + 1) % 2; //#D
  led.writeSync(value);
}

function GetPIRInfo(){
  return pir.readSync() ? "Movement" : "No Movement";
}

function GetDHTInfo(){
  var readout = sensorLib.read(); //#C

  return {
    Temperature: readout.temperature.toFixed(2),
    Humidity: readout.humidity.toFixed(2)
  }
}