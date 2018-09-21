console.log('imported index.js')
function subscribeToWs(url) {

    var socket = new WebSocket(url);

    socket.onmessage = function (websocket, event) {
        console.log('websocket.path: ' + websocket.path);
        console.log(websocket.parse);
        DelegateMessage(JSON.parse(event.data), websocket.path);
    };
    socket.onerror = function (error) {
        console.log('An error occurred while trying to connect to a Websocket!');
        console.log(error);
    };
    socket.onopen = function (event) {
        console.log('opened websocket');
    };
}

subscribeToWs('ws://192.168.0.107:8081/pi/sensors/temperature');
subscribeToWs('ws://192.168.0.107:8081/pi/sensors/humdity');
subscribeToWs('ws://192.168.0.107:8081/pi/sensors/pir');
subscribeToWs('ws://192.168.0.107:8081/pi/actuators/red');
subscribeToWs('ws://192.168.0.107:8081/pi/actuators/green');
subscribeToWs('ws://192.168.0.107:8081/pi/actuators/yellow');

function DelegateMessage(info, path) {
    switch (path) {
        case 'pi/sensors/pir':
            UpdatePir(info);
            break;
        case 'pi/sensors/temperature':
            UpdateTemperature(info);
            break;
        case 'pi/sensors/humidity':
            UpdateHumidity(info);
            break;
    
        default:
            console.log('we don\'t care about this topic');
            break;
    }
}


function UpdatePir(info) {
    console.log('PIR is%s detecting movement', info.value ? '' : ' not');
}
function UpdateTemperature(info) {
    console.log('Current Temperature: %s degrees %s', info.value, info.unit);
}
function UpdateHumidity(info) {
    console.log('Current Humidity: %s%s', info.value, info.unit);
}


// function Update






// document.getElementById("value").innerHTML = newData.value;
// document.getElementById("name").innerHTML = newData.name;
// document.getElementById("description").innerHTML = newData.description;
// document.getElementById("unit").innerHTML = newData.unit;
