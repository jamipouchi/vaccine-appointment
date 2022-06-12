const jwt = require("jsonwebtoken");
const express = require("express");

const app = express();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SEED_AUTENTICACION, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

app.get("/vaccine-info", authenticateToken, (req, res) => {
  res.json({
    ok: true,
    message: "Vaccine info",
  });
});

module.exports = app;
