import * as express from "express";
import { Routes } from "./routes/routes";
import * as path from "path"

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express.default();
        this.config();
        this.routePrv.routes(this.app);     
    }

    private config(): void {
        this.app.set('views', path.join(__dirname, '/views'));
        this.app.set('view engine', 'ejs');
    }
}
export default new App().app;