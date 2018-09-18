import app from "./app";
import * as http from 'http';
import * as WebSocket from 'ws';
import { InitWebsocket } from "./websockets"

const APPPORT = 8080;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
let data: any;

wss.on('connection', (ws: WebSocket, req: Request) => {
    console.log('new connection');
    let desiredResource: string;

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

//start our server
app.listen(APPPORT, () => {
    console.log(`Server started on port ${APPPORT} :)`);
});
