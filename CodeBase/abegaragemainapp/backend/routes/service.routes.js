// Import express and create a router instance
const express = require("express");
const router = express.Router();

// Import the service controller
const serviceController = require("../controllers/service.controller");
// Import middleware for authentication
const authMiddleware = require("../middlewares/auth.middleware");

// Route to add a new service
router.post(
  "/api/service",
  [authMiddleware.verifyToken],
  serviceController.addService
);
// Create a route to handle the get all service
router.get(
  "/api/services",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.getAllServices
);

module.exports = router;
