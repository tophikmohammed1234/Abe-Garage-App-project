const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

// Add a new customer
router.post("/api/customer", customerController.addCustomer);

module.exports = router;
