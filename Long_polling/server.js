const http = require("http");
const path = require("path");
const app = require("express")();

const server = http.createServer(app);

app.get("/data", function (req, res, next) {
  const time = new Date().getTime();

  let seconds = Math.random() * 10000;

  if (seconds < 1000) {
    return res.json({ hasValue: false, value: null });
  }

  if (seconds > 8000) {
    seconds = 60000;
  }

  console.log("waiting seconds before responding", seconds);

  return setTimeout(function () {
    return res.json({ hasValue: true, value: time });
  }, seconds);
});

server.listen(
  process.env.PORT || 3000,
  process.env.IP || "0.0.0.0",
  function () {
    const addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
  }
);
