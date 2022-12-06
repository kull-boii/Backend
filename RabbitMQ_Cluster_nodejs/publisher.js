const rabbit = require("amqplib");
const { v4: uuidv4 } = require("uuid");
const loremIpsum = require("lorem-ipsum").loremIpsum;

const QUEUE_NAME = "messages";
const EXCHANGE_TYPE = "direct";
const EXCHANGE_NAME = "main";
const KEY = "myKey";

connection = rabbit.connect("amqp://localhost");
connection.then(async (conn) => {
  const channel = await conn.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
  await channel.assertQueue(QUEUE_NAME);
  channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
  console.log("started publishing");
  setInterval(async () => {
    const payload =
      `{"user_id":"` +
      uuidv4() +
      `", "time":"` +
      new Date() +
      `", "message": "` +
      loremIpsum() +
      `"}`;
    // console.log(payload);
    await channel.sendToQueue(QUEUE_NAME, Buffer.from(payload));
  }, 1000);
});
