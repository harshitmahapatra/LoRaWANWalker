import * as WebSocket from 'ws';
import * as http from 'http';
const WSPORT = 8081;
let data: any;
function InitWebsocket() {
    const wss = new WebSocket.Server({ port: WSPORT });
    let desiredResource : string;
    
    wss.on('connection', (ws: WebSocket, req: Request) => {
        desiredResource = req.url;
        SelectResouce(desiredResource);
        ws.send(data)

        setInterval(() => {
            SelectResouce(desiredResource);
            console.log(data);
            ws.send(data)
        }, 500);
    })
}

function SelectResouce(url : string) { //#E
    http.get({
        host: 'localhost',
        path: url,
        port: 8080
    }, function (response) {
        // Continuously update stream with data
        let body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            data = body;
        });
    });
}

export { InitWebsocket };
