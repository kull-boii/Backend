/*
UDP {User datagram protocol}
- low latency
- loss tolerating connections 
- speeds up transmissions by enabling the transfer of data before an agreement is provided by the receiving party

Adv and disAdv:
- smaller packets {no ACK, {no Guaranteed delivery}}
- connection less {no additional headers} {Connection less there is no need to establish connection prior to data transfer.}
- Faster than TCP no wait for ordering packets or congestion control {Connection less there is no need to establish connection prior to data transfer}
- Stateless Means if the client sending information to the server and the server down for a time. When server become up again the client can continue sending information process.
*/

// The node:dgram module provides an implementation of UDP datagram sockets.
const dgram = require("dgram");
const serverUDP = dgram.createSocket("udp4");

serverUDP
  .on("error", (err) => {
    console.log(`serverUDP error:\n${err.stack}`);
    serverUDP.close();
  })
  .on("message", (msg, rinfo) => {
    // display msg and sender information ip:port
    console.log(`serverUDP got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  })
  .on("listening", () => {
    const address = serverUDP.address();
    console.log(`serverUDP listening ${address.address}:${address.port}`);
  });

serverUDP.bind(3001);

/*
run:
node index.js

and in another {OPEN BASH or git bash}
echo “YOUR MESSAGE” > /dev/udp/127.0.0.1/3001  
or you can use netcat
echo "New Message from client" | nc -u 127.0.0.1 3001
*/
