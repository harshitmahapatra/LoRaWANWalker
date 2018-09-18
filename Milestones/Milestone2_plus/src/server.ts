import app from "./app";
import { InitWebsocket } from "./websockets"

const APPPORT = 8080;

//Get the server running
app.listen(APPPORT, () => {
    console.log(`Express server listening http://localhost:${APPPORT}/`);
})

InitWebsocket();
