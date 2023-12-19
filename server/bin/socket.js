let socket;

const initSocket = (server) => {
  socket = require("socket.io")(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  socket.on("connection", (socketIo) => {
    console.log("A user connected");
    socketIo.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

const emitMessage = (message) => socket.emit("serverMessage", message);

module.exports = {
  emitMessage,
  initSocket,
};
