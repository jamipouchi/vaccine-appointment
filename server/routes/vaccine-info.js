const jwt = require("jsonwebtoken");
const express = require("express");
const Usuario = require("./../models/usuario");
const authenticateToken = require("../utils/authenticate-token");

const app = express();

app.delete("/vaccine-slot", authenticateToken, (req, res) => {
  Usuario.findByIdAndUpdate(
    req.user.usuario._id,
    {
      $push: { vaccines: req.body.scheduled_slot },
      $unset: { scheduled_slot: 1 },
    },
    (err, usuarioDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        usuario: usuarioDB,
      });
    }
  );
});

app.post("/vaccine-slot", authenticateToken, (req, res) => {
  Usuario.findByIdAndUpdate(
    req.user.usuario._id,
    { scheduled_slot: req.body.scheduled_slot },
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User : ", docs);
      }
    }
  );
  res.json({
    ok: true,
    message: "Vacunación programada",
    scheduled_slot: req.body.scheduled_slot,
  });
});

app.get("/vaccine-slot", authenticateToken, (req, res) => {
  const usuario = Usuario.findById(req.user.usuario._id, (erro, usuario) => {
    if (!usuario.scheduled_slot) {
      return res.status(400).json({
        ok: true,
        message: "No hay cita programada",
        vaccines: usuario.vaccines,
      });
    } else {
      return res.json({
        ok: true,
        message: "Cita programada",
        scheduled_slot: usuario.scheduled_slot,
        vaccines: usuario.vaccines,
      });
    }
  });
});

module.exports = app;
