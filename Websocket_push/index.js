const http = require("http");

// WebSocket protocol provides a way to exchange data between a client and server over a persistent connection
const WebSocketServer = require("websocket").server;

// all connections will be stored here
const connections = [];

// EVERY webSocket server has to be an http server for the webSocket initiation process
// https://stackoverflow.com/questions/59706001/why-do-we-pass-an-http-server-to-a-websocket-instance-in-javascript-on-nodejs
const httpserver = http.createServer();

//listen on the TCP socket
httpserver.listen(8080, () =>
  console.log("My server is listening on port 8080")
);

const websocket = new WebSocketServer({
  httpServer: httpserver,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false,
});

function isOriginAllowed(origin) {
  return true;
}

websocket.on("request", (request) => {
  if (!isOriginAllowed(request.origin)) {
    request.reject();
    console.log(
      new Date() + " Connection from origin " + request.origin + " rejected."
    );
    return;
  } else {
    // accept the connection
    const connection = request.accept(null, request.origin);

    connections.forEach((c) =>
      c.send(`User${connection.socket.remotePort} just connected.`)
    );

    // append it to the connections list
    connections.push(connection);

    // event listner
    connection
      .on("message", (message) => {
        // broadcast it to every one
        connections.forEach((c) =>
          c.send(
            `User${connection.socket.remotePort} says: ${message.utf8Data}`
          )
        );
      })
      .on("close", () => connections.filter((i) => i !== connection));
  }
});

// client code => RUN ON BROWSER CONSOLE
// let ws = new WebSocket("ws://localhost:8080");
// ws.onmessage = message => console.log(`Received: ${message.data}`);
// ws.send("Hello! I'm client")
