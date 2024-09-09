const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

// Add a new customer
router.post("/api/customer", customerController.addCustomer);

//get customer by id
router.get("/api/customer/:id", customerController.getCustomerById);
module.exports = router;
