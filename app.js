require("express-async-errors");
const express = require("express");
const cors = require("cors");
const config = require("config");
const socketio = require("socket.io");
const path = require("path");
const routes = require("./routes");
const DBConnection = require("./startup/dbConnection");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

DBConnection(); //db connection.
app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("new user connected");
});

app.use("/api/v1", routes);

const port = process.env.PORT || config.get("port");

server.listen(port, () => {
  console.log(`Server Listen at:${port}`);
});
