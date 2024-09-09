// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the install router
const installRouter = require("./install.routes");
// Import the employee routes
const employeeRouter = require("./employee.routes");
//import the update routes
const updateRoutes = require("./update.routes");
// Import the login routes
const loginRoutes = require("./login.routes");
// Import the customer routes
const customerRouter = require("./customer.routes");
// Import the service routes
const serviceRouter = require("./service.routes");
// Add the install router to the main router
router.use(installRouter);
// Add the employee routes to the main router
router.use(employeeRouter);
// Add the update routes to the main router
router.use(updateRoutes);
// Add the login routes to the main router
router.use(loginRoutes);
// Add the customer routes to the main router
router.use(customerRouter);
// Add the service routes to the main router
router.use(serviceRouter);

// Export the router
module.exports = router;
