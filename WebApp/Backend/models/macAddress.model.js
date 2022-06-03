const mongoose = require("mongoose");
const { model, Schema, Types } = mongoose;

const macAdressSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User" },
  macAddress: [{ type: String }],
});

const MacAdress = model("MacAdress", macAdressSchema);
module.exports = MacAdress;
