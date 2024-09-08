const serviceService = require("../services/service.service");
// controllers/service.controller.js
async function addService(req, res, next) {
  try {
    const { service_name, service_description } = req.body;

    console.log("Request Body:", req.body); // Debugging line

    // Validate if both fields are provided
    if (!service_name || !service_description) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    // Call the service to add the new service
    const newService = await serviceService.createService(
      service_name,
      service_description
    );

    if (!newService) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Failed to create service",
      });
    }

    // Successful response
    res.status(201).json({
      message: "Service created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error creating service:", error); // Improved error logging
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

module.exports = {
  addService,
};
