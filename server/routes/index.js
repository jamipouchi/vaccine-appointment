const express = require("express");
const app = express();

app.use(require("./login"));
app.use(require("./vaccine-info"));

module.exports = app;
