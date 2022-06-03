const express = require("express");
const { Router } = express;
const authRoutes = require("./auth.routes");
const adminRoutes = require("./admin.routes");
const mqttDataRoutes = require("./mqttData.routes");
const macAdressRoutes = require("./macaddress.routes");
const role = require("../middlewares/roles.middleware");
const auth = require("../middlewares/auth.middleware");

const router = Router();

router.use("/auth", authRoutes);

router.use("/admin", auth.userAuth, role.isAdmin, adminRoutes);

router.use("/mqtt", auth.userAuth, mqttDataRoutes);

router.use("/macAddress", auth.userAuth, macAdressRoutes);

module.exports = router;
