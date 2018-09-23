import * as WebSocket from 'ws';
import * as http from 'http';

let data: any;
function InitWebsocket(server : http.Server) {
    const wss = new WebSocket.Server({ port : 8081 });
    
    wss.on('connection', (ws: WebSocket, req: Request) => {
        console.log('new connection from ' + req.url);

        let desiredResource : string = req.url;
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
