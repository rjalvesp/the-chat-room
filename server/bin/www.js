const config = require("config");
const app = require("../app");
const http = require("http");
const { onError, onListening } = require("./helpers");
const Socket = require("./socket");

const server = http.createServer(app);

Socket.initSocket(server);

const port = config.server.www.port;

app.set("port", port);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening(server));
