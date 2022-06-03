const mqttClient = require("../config/mqtt");
const mqttData = require("../models/mqttData.model");

const client = mqttClient.connect();

/**
 * Post Data to DB Received from DB
 */
exports.postMqttData = () => {
  try {
    client.on("message", async (topic, payload) => {
      let message = JSON.parse(payload);
      console.log(message);
      console.log("Received Message:", topic, message);
      let data = await mqttData.create(message);
      data.save();
    });
    console.log("Data Saved");
  } catch (error) {
    console.error(error);
  }
};

/**
 * Publish Data to MQtt
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
exports.publishToMqtt = async (req, res) => {
  try {
    console.log(req.params.macAddress);
    const { message } = req?.body;
    const macAddress = req.params.macAddress + "/dosingControl";
    // client.publish(
    //   `dosingControl`,
    //   "message",
    //   { qos: 0, retain: false },
    //   (error) => {
    //     if (error) {
    //       console.error(error);
    //     }
    //   }
    // );
    client.publish(macAddress, message, { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error);
      }
    });
    return res.status(200).json({ message: "Data Published" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Get Data By MacAdress
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
exports.getDataByMacAddress = async (req, res) => {
  try {
    const data = await mqttData.find({ macAdress: req?.body?.macAddress });
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
