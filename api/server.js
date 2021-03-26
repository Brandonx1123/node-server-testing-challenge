const express = require("express");

const daGoats = require("./daGoats/daGoats-model");

const server = express();

server.use(express.json());

server.get("/daGoats", (req, res) => {
  daGoats
    .getAll()
    .then((goat) => {
      res.status(200).json(goat);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.post("/daGoats", (req, res) => {
  daGoats
    .insert(req.body)
    .then((goat) => {
      res.status(201).json(goat);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.delete("/daGoats/:id", (req, res) => {
  daGoats
    .remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "you deleted one of the GOATS" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = server;
