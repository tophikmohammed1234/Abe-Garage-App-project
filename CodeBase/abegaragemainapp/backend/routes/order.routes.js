
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// delete the order
router.delete(
  "/api/order/:id",
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  orderController.deleteOrder
);

module.exports = router;

