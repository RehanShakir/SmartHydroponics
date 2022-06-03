const mongoose = require("mongoose");
const { model, Schema, Types } = mongoose;

const mqttDataSchema = new Schema(
  {
    // userId: { type: Types.ObjectId, ref: "User" },
    macAdress: { type: String },
    temperature: { type: String },
    humidity: { type: String },
    liquidTemperature: { type: String },
    tds: { type: String },
    ph: { type: String },
    orp: { type: String },
    co2: { type: String },
  },
  { timestamps: true }
);
const MqttData = model("MqttData", mqttDataSchema);
module.exports = MqttData;
