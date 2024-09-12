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

// Create the getAllServices controller
async function getAllServices(req, res, next) {
  // Call the getAlLServices method from the service service
  const services = await serviceService.getAllServices();
  if (!services) {
    res.status(400).json({
      error: "Failed to get all employees!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: services,
    });
  }
}

// Create the getServiceById controller
async function getServiceById(req, res, next) {
  try {
    const serviceId = req.params.id;
    const service = await serviceService.getServiceById(serviceId);

    if (!service) {
      return res.status(404).json({
        error: "Not Found",
        message: "Service with the specified ID not found.",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}
module.exports = {
  addService,
  getAllServices,
  getServiceById,
};
