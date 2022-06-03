const express = require("express");
const { Router } = express;
const controller = require("../controllers/admin/admin.controller");
const {
  dashboardCounts,
  getAllUsers,
  getAllUsersMacaddress,
  getAllUsersMqttData,
} = controller;

const router = Router();

/**
 * Get Dashbord Counts
 */
router.get("/count", dashboardCounts);

/**
 * Get All Users
 */
router.get("/all-users", getAllUsers);

/**
 * Get All Users Macaddress
 */
router.get("/all-macAddress", getAllUsersMacaddress);

/**
 * Get All Users Mqtt Data
 */
router.get("/all-mqttData", getAllUsersMqttData);

module.exports = router;
