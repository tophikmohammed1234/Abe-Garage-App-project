// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the employee controller
const employeeController = require("../controllers/employee.controller");
// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");
// Import the update controller
// const updateController = require("../controllers/employee.controller");
// Create a route to handle the add employee request on post
router.post(
  "/api/employee",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.createEmployee
);
// Create a route to handle the get all employees request on get
router.get(
  "/api/employees",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getAllEmployees
);
// create a route to handle the delete employee request on delete
router.get("/api/employee/:id", employeeController.getEmployeeById);
router.delete("/api/employee/:id", employeeController.deleteEmployee);

// Create a route to handle the update employee request on put
router.put("/api/employee/", employeeController.updateEmployee);
// Export the router
module.exports = router;
