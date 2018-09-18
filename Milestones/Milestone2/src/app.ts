import express from "express";
import { Routes } from "./routes/routes";
import * as path from "path"


const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

new Routes().routes(app);

export default app;

// class App {
//     public app: express.Application;
//     public routePrv: Routes = new Routes();

//     constructor() {
//         this.app = express.default();
//         this.config();
//         this.routePrv.routes(this.app);     
//     }

//     private config(): void {
//         this.
//         this.app.set('view engine', 'ejs');
//     }
// }
//export default new App().app;