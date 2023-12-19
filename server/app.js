const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const config = require("config");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", cors(config.server.corsOptions), require("./api"));
app.use((error, _req, res, _next) => {
  console.log(error);
  res.status(500).json({ error });
});

module.exports = app;
