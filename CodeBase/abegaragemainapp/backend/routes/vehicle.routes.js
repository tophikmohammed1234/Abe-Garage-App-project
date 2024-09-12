const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicle.controller");

// Add a new vehicle
router.post("/api/vehicle", vehicleController.addVehicle);

module.exports = router;
