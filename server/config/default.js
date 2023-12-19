const path = require("path");
require("dotenv-safe").config({
  allowEmptyValues: false,
  example: path.join(process.cwd(), ".env.example"),
  path: path.join(process.cwd(), ".env"),
});
const { omit } = require("ramda");

module.exports = {
  server: {
    corsOptions: {
      origin: (origin, callback) => {
        const whitelist = JSON.parse(process.env.CORS_WHITELIST);
        if (
          process.env.NODE_ENV !== "development" &&
          !whitelist.includes(origin)
        ) {
          /* istanbul ignore next */
          return callback("Not allowed by CORS");
        }
        callback(null, true);
      },
    },
    www: {
      port: process.env.PORT,
    },
    socket: {
      port: process.env.PORT_SOCKET,
    },
  },
  databases: {
    main: {
      name: process.env.DB_NAME,
      connectionString: process.env.DB_CONNECTION_STRING,
    },
  },
};
