"use strict";
// lib/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var PORT = 3000;
app_1.default.listen(PORT, function () {
    console.log("Express server listening http://localhost:" + PORT + "/");
});
