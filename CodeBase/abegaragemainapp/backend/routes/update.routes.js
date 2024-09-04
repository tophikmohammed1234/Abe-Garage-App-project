// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the update controller
const updateController = require("../controllers/update.controller");
// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the update employee request on put
router.put(
  "/api/employee/",
 
  updateController.updateEmployee
);

// Export the router
module.exports = router;
