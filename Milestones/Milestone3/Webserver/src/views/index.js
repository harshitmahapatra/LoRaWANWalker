function subscribeToWs(url) {
    var socket = new WebSocket(url);

    socket.onmessage = function(event) {
        DelegateMessage(JSON.parse(event.data));
    };
    socket.onerror = function (error) {
        console.log('An error occurred while trying to connect to a Websocket!');
        console.log(error);
    };
    socket.onopen = function (event) {
        console.log('Opened websocket to ' + url);
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
    var state = document.getElementById('red led').innerHTML.split(' ').slice(-1)[0];
    SendState(redLedSocket, (state == 'ON') ? false : true);
}

function ChangeGreenLED() {
    var state = document.getElementById('green led').innerHTML.split(' ').slice(-1)[0];
    SendState(greenLedSocket, (state == 'ON') ? false : true);
}

function ChangeYellowLED() {
    var state = document.getElementById('yellow led').innerHTML.split(' ').slice(-1)[0];
    SendState(yellowLedSocket, (state == 'ON') ? false : true);
}

function SendState(ws, state){
    try {
        ws.send(JSON.stringify({
            'value': state
        }));
    } catch (error) {
        console.log(error);
    }
}
