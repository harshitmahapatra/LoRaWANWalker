console.log('start script');
const URL = '35.204.82.222';

function subscribeToWs(url) {

    var socket = new WebSocket(url);

    socket.onmessage = function(event) {
        console.log(event.data)
        console.log(JSON.parse(event.data));
        DelegateMessage(JSON.parse(event.data));
    };
    socket.onerror = function (error) {
        console.log('An error occurred while trying to connect to a Websocket!');
        console.log(error);
    };
    socket.onopen = function (event) {
        console.log('opened websocket');
    };
}

subscribeToWs('ws://35.204.82.222:8080/pi/sensors/temperature');
subscribeToWs('ws://35.204.82.222:8080/pi/sensors/humdity');
subscribeToWs('ws://35.204.82.222:8080/pi/sensors/pir');
//subscribeToWs('ws://192.168.0.107:8081/pi/actuators/red');
//subscribeToWs('ws://192.168.0.107:8081/pi/actuators/green');
//subscribeToWs('ws://192.168.0.107:8081/pi/actuators/yellow');

function DelegateMessage(info) {
    switch (info.name) {
        case 'pi/sensors/pir':
            UpdatePir(info);
            break;
        case 'Humidity Sensor':
            UpdateTemperature(info);
            break;
        case 'Passive Infrared':
            UpdateHumidity(info);
            break;

        default:
            console.log('we don\'t care about this topic');
            break;
    }
}


function UpdatePir(info) {
    console.log('PIR is%s detecting movement', info.value ? '' : ' not');
    document.getElementById("movement").innerHTML = info.value ? '' : ' no'
}

function UpdateTemperature(info) {
    console.log('Current Temperature: %s degrees %s', info.value, info.unit);
}

function UpdateHumidity(info) {
    console.log('Current Humidity: %s%s', info.value, info.unit);
}
/*




// document.getElementById("value").innerHTML = newData.value;
// document.getElementById("name").innerHTML = newData.name;
// document.getElementById("description").innerHTML = newData.description;
// document.getElementById("unit").innerHTML = newData.unit;
*/