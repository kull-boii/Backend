const express = require("express");
const app = express();

const cors = require("cors");

const planetRouter = require("./routes/planets/planets.router");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(planetRouter);

module.exports = app;
