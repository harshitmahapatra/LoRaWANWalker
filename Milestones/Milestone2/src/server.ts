import app from "./app";
import * as http from 'http';
import * as WebSocket from 'ws';
import { InitWebsocket } from "./websockets"

const PORT = 8080;
const HOST = "localhost";

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

console.log('address: ' + wss.address())
console.log('eventNames: ' + wss.eventNames)
console.log('path: ' + wss.path)
console.log('options: ' + wss.options)
console.log(wss);

let data : any;
wss.on('connection', (ws: WebSocket, req: Request) => {
    console.log('new connection from ' + req.url);

    let desiredResource: string = req.url;
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


function SelectResouce(url: string) { //#E
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



// wss.on('connection', (ws: WebSocket, req: Request) => {
//     console.log('new connection');

//     ws.send('I got your connection, ' + req.url);
// })


server.listen(PORT, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});