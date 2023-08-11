"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
// import "src/index.html";
const socket_io_1 = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new socket_io_1.Server(server);
app.use(express.static("/home/web-h-003/Documents/Node js projects TS/One to one chat Project/src" +
    "/public"));
app.get("/", (req, res) => {
    res.sendFile("/home/web-h-003/Documents/Node js projects TS/One to one chat Project/src" +
        "/index.html");
});
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on("groupName", (room) => {
        socket.join(room);
    });
    socket.on("message", (msg) => {
        if (msg.groupName) {
            socket.to(msg.groupName).emit("message", msg);
        }
    });
}));
server.listen(3000, () => {
    console.log("listening on port:3000");
});
//# sourceMappingURL=index.js.map