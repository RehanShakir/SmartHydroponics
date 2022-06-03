const express = require("express");
const { Router } = express;
const controller = require("../controllers/mqttData.controller");
const { postMqttData, publishToMqtt, getDataByMacAddress } = controller;

const router = Router();
postMqttData();

router.post("/publish/:macAdress", publishToMqtt);

router.post("/getData", getDataByMacAddress);

module.exports = router;
