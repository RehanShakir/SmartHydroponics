const express = require("express");
const { Router } = express;
const controller = require("../controllers/macaddress.controller");
const { addMacAddress, getAllMacAdresses, removeMacaddress } = controller;

const router = Router();

router.post("/add", addMacAddress);

router.get("/getAll", getAllMacAdresses);

router.patch("/remove", removeMacaddress);

module.exports = router;
