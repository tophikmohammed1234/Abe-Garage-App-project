const { query } = require("../config/db.config");

async function createService(service_name, service_description) {
	if (!service_name || !service_description) {
		throw new Error("Both service_name and service_description are required");
	}

	try {
		// Ensure the table name is correct here
		const sql =
			"INSERT INTO common_services (service_name, service_description) VALUES (?, ?)";

		// Execute the query
		const result = await query(sql, [service_name, service_description]);

		// Log the result to debug
		console.log("Query Result:", result);

		// Ensure result contains insertId
		if (result && result.insertId) {
			return { service_id: result.insertId };
		}

		// Handle unexpected result structure
		throw new Error("Unexpected result structure from database");
	} catch (err) {
		console.error("Error creating service:", err);
		throw new Error("Failed to create service");
	}
}
// A function to get all services
async function getAllServices() {
	const sql = `
    SELECT service_id, service_name, service_description
    FROM common_services;
  `;
	const rows = await query(sql);
	return rows;
}

// A function to get service by id
async function getServiceById(serviceId) {
	const sql = `
    SELECT service_id, service_name, service_description
    FROM common_services
    WHERE service_id = ?;
  `;

	const rows = await query(sql, [serviceId]);
	return rows[0] || null;
}

async function deleteService(serviceId) {
	try {
		await query("DELETE FROM common_services WHERE service_id = ?", [
			serviceId,
		]);

		return true;
	} catch (err) {
		console.error("Error deleting Service:", err);
		throw new Error("Failed to delete Service");
	}
}

module.exports = {
	createService,
	getAllServices,
	getServiceById,
	deleteService,
};
