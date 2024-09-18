const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicle.controller");

// Add a new vehicle
router.post("/api/vehicle", vehicleController.addVehicle);
router.get("/api/vehicle/:id", vehicleController.getVehicleById);
router.get(
  "/api/vehicles/:customer_id",
  vehicleController.getAllVehiclesPerCustomer
);

// Update a vehicle
router.put("/api/vehicle/:id", vehicleController.updateVehicle);

module.exports = router;
