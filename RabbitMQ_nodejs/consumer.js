const rabbit = require("amqplib");
const QUEUE_NAME = "messages";
connection = rabbit.connect("amqp://localhost");
connection.then(async (conn) => {
  const channel = await conn.createChannel();
  channel.consume(QUEUE_NAME, (m) => {
    const payload = m.content.toString();
    const result = JSON.parse(payload);
    console.log(result);
    channel.ack(m);
  });
});
