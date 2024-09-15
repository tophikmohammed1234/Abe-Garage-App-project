const vehicleService = require("../services/vehicle.service");

async function addVehicle(req, res) {
	try {
		const {
			customer_id,
			vehicle_model,
			vehicle_year,
			vehicle_make,
			vehicle_type,
			vehicle_mileage,
			vehicle_tag,
			vehicle_serial,
			vehicle_color,
		} = req.body;

		// Validate required fields
		if (
			!customer_id ||
			!vehicle_model ||
			!vehicle_year ||
			!vehicle_make ||
			!vehicle_type ||
			!vehicle_mileage ||
			!vehicle_tag ||
			!vehicle_serial ||
			!vehicle_color
		) {
			return res.status(400).json({
				error: "Bad Request",
				message: "Please provide all required fields",
			});
		}

		await vehicleService.addVehicle(req.body);

		res.status(201).json({
			message: "Vehicle created successfully",
			success: true,
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "An unexpected error occurred.",
		});
	}
}
async function getVehicleById(req, res, next) {
  try {
    const vehicle_id = req.params.id;
    const Vehicle = await vehicleService.getVehicleById(vehicle_id);
console.log(Vehicle);
    if (!Vehicle) {
      return res.status(404).json({
        error: "Not Found",
        message: "Service with the specified ID not found.",
      });
    }

    res.status(200).json(Vehicle);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

//getVehicleById
module.exports = { addVehicle, getVehicleById };
