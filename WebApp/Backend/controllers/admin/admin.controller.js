const express = require("express");
const User = require("../../models/user.model");
const Mqtt = require("../../models/mqttData.model");
const Macaddress = require("../../models/macAddress.model");
const { Request, Response } = express;

/**
 * Send Dashboard counts
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
exports.dashboardCounts = async (req, res) => {
  try {
    const users = await User.countDocuments({ role: "client" });
    const admins = await User.countDocuments({ role: "admin" });

    const macAddressess = await Mqtt.countDocuments();
    const mqtt = await Mqtt.countDocuments();

    return res.status(200).json({ users, macAddressess, mqtt, admins });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
  }
};

/**
 * Get All Users
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "client" });
    return res.status(200).json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
  }
};

/**
 * Get All Users Macaddress
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
exports.getAllUsersMacaddress = async (req, res) => {
  try {
    const Macaddressess = await Macaddress.find().populate({
      path: "userId",
      select: "-password",
    });
    return res.status(200).json({ Macaddressess });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
  }
};

/**
 * Get All Users MqttData
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
exports.getAllUsersMqttData = async (req, res) => {
  try {
    const mqttData = await Mqtt.find();
    return res.status(200).json({ mqttData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
  }
};

/**
 * Get All Users Macaddress
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
