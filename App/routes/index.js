const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Logger = require("../config/logger");
const UrlRoutes = require("./url");

const app = express();

global.logger = Logger.createLogger({ label: "URL_SHORTENER" });

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));

app.use("/", UrlRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
