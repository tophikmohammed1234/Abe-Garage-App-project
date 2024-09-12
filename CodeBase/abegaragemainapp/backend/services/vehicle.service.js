const db = require("../config/db.config");

async function addVehicle(vehicleData) {
	const insertVehicleQuery = `
        INSERT INTO customer_vehicle_info
        (customer_id, vehicle_model, vehicle_year, vehicle_make, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
	} = vehicleData;

	const connection = await db.pool.getConnection();
	try {
		await connection.beginTransaction();

		await connection.query(insertVehicleQuery, [
			customer_id,
			vehicle_model,
			vehicle_year,
			vehicle_make,
			vehicle_type,
			vehicle_mileage,
			vehicle_tag,
			vehicle_serial,
			vehicle_color,
		]);

		await connection.commit();
	} catch (error) {
		await connection.rollback();
		throw error;
	} finally {
		await connection.release();
	}
}

module.exports = { addVehicle };
