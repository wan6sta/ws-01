"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
require("dotenv/config");
const PORT = Number(process.env.PORT) || 5000;
const wss = new ws_1.default.Server({
    port: PORT
}, () => console.log(`Websockets is running on port ${PORT}`));
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        message = JSON.parse(String(message));
        console.log(message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message);
                break;
            case 'connection':
                broadcastMessage(message);
                break;
        }
    });
});
function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    });
}
