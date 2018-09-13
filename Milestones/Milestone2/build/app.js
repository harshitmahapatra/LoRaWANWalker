"use strict";
/* app/app.ts */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var bodyParser = __importStar(require("body-parser"));
var App = /** @class */ (function () {
    function App() {
        this.app = express.default();
        this.config();
        this.mountRoutes();
    }
    App.prototype.mountRoutes = function () {
        var router = express.Router();
        router.get('/', function (req, res) {
            res.json({
                message: 'Hello World!'
            });
        });
        this.app.use('/', router);
    };
    App.prototype.config = function () {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    };
    return App;
}());
exports.default = new App().app;
