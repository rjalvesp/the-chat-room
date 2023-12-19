const debug = require("debug")("server:server");

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES": {
      // eslint-disable-next-line no-console
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    }
    case "EADDRINUSE": {
      // eslint-disable-next-line no-console
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    }
    default: {
      throw error;
    }
  }
};

const onListening = (server) => () => {
  const addr = server.address();
  debug(`Listening on port ${addr.port}`);
};

module.exports = {
  onError,
  onListening,
};
