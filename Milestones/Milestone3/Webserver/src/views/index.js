console.log('start script');

function subscribeToWs(url) {

    var socket = new WebSocket(url);

    socket.onmessage = function(event) {
        console.log(event.data);
        DelegateMessage(JSON.parse(event.data));
    };
    socket.onerror = function (error) {
        console.log('An error occurred while trying to connect to a Websocket!');
        console.log(error);
    };
    socket.onopen = function (event) {
        console.log('opened websocket');
    };
    
    return socket;
}

subscribeToWs('ws://35.204.82.222:8080/pi/sensors/temperature');
subscribeToWs('ws://35.204.82.222:8080/pi/sensors/humidity');
subscribeToWs('ws://35.204.82.222:8080/pi/sensors/pir');
var redLedSocket = subscribeToWs('ws://35.204.82.222:8080/pi/actuators/leds/red');
var greenLedSocket = subscribeToWs('ws://35.204.82.222:8080/pi/actuators/leds/green');
var yellowLedSocket = subscribeToWs('ws://35.204.82.222:8080/pi/actuators/leds/yellow');

function DelegateMessage(info) {
    let splitName = info.name.split(' ');
    if (splitName[1] == 'led') {
        if ((splitName[0] == 'red')    ||
           (splitName[0] == 'yellow') ||
           (splitName[0] == 'green'))
        {
            UpdateLED(info);
            return;
        } 
    }
    switch (info.name) {
        case 'Passive Infrared':
            UpdatePir(info);
            break;
        case 'Temperature Sensor':
            UpdateTemperature(info);
            break;
        case 'Humidity Sensor': 
            UpdateHumidity(info);
            break;
        default:
            console.log('unrecognizable sensor');
            break;
    }
}

function UpdatePir(info) {
    if (info.value) {
        document.getElementById("movement").innerHTML = "Movement detected!";
    } else {
        document.getElementById("movement").innerHTML = "No movement detected";
    }
}

function UpdateTemperature(info) {
    document.getElementById("temperature").innerHTML = `Current Temperature: ${info.value} degrees ${info.unit}`;
}

function UpdateHumidity(info) {
    document.getElementById("humidity").innerHTML = `Current Humidity: ${info.value}${info.unit}`;
}

function UpdateLED(info) {
    document.getElementById(info.name).innerHTML = `The ${info.name} is ${info.value ? 'ON' : 'OFF'}`;
}

function ChangeRedLED() {
    console.log('change red led');
    var newState = (document.getElementById('red led').innerHTML == 'ON') ? false : true;
    redLedSocket.send(JSON.stringify({'value' : newState}));
}

function ChangeGreenLED() {
    console.log('change green led');
    var newState = (document.getElementById('green led').innerHTML == 'ON') ? false : true;
    greenLedSocket.send(JSON.stringify({'value' : newState}));
}

function ChangeYellowLED() {
    console.log('change yellow led');
    var newState = (document.getElementById('yellow led').innerHTML == 'ON') ? false : true;
    yellowLedSocket.send(JSON.stringify({'value' : newState}));
}
