import * as express from "express";
import * as http from "http";
// import "src/index.html";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(
  express.static(
    "/home/web-h-003/Documents/Node js projects TS/One to one chat Project/src" +
      "/public"
  )
);

app.get("/", (req, res) => {
  res.sendFile(
    "/home/web-h-003/Documents/Node js projects TS/One to one chat Project/src" +
      "/index.html"
  );
});

io.on("connection", async (socket) => {
  socket.on("groupName", (room) => {
    socket.join(room);
  });
  socket.on("message", (msg) => {
    if (msg.groupName) {
      socket.to(msg.groupName).emit("message", msg);
    }
  });
});

server.listen(3000, () => {
  console.log("listening on port:3000");
});
