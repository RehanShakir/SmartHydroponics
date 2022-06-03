const mqtt = require("mqtt");

const topic = "smartdosing/#";
const host = "broker.hivemq.com";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const connectUrl = `mqtt://${host}:${port}`;

exports.connect = () => {
  try {
    console.log("connect");
    let client = mqtt.connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000000,
      username: "hello",
      password: "hello",
      reconnectPeriod: 1000000,
    });

    client.on("connect", () => {
      console.log("Connected");
      client.subscribe([topic], () => {
        console.log(`Subscribed to ${topic}`);
      });
    });
    return client;
  } catch (error) {
    console.log(error);
  }
};

// exports.getPayload = () => {
//   return client.on("message", (topic, payload) => {
//     console.log("Received Message:", topic, payload.toString());
//     return payload.toString();
//   });
// };
