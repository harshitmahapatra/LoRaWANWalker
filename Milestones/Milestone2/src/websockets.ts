import * as WebSocket from 'ws';
import * as http from 'http';
import {Application} from "express";

const WSPORT = 8081;
let data: any;
function InitWebsocket(server : Application) {
    const wss = new WebSocket.Server({ server : server });
    let desiredResource : string;
    
    wss.on('connection', (ws: WebSocket, req: Request) => {
        console.log('new connection');

        desiredResource = req.url;
        SelectResouce(desiredResource);
        ws.send(data)

        setInterval(() => {
            SelectResouce(desiredResource);
            console.log(data);
            try {
                ws.send(data)
            } catch (error) {
                ws.close();                
            }
        }, 500);
    })
    return wss;
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
