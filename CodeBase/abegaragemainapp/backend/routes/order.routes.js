// Import express and create a router instance
const orderController = require("../controllers/order.controller");
// Import middleware

const express = require("express");
const router = express.Router();


// Import middleware for authentication
const authMiddleware = require("../middlewares/auth.middleware");
// Route to add a new service
router.post(
  "/api/order",
  [authMiddleware.verifyToken],
  orderController.addOrder
);
module.exports = router;