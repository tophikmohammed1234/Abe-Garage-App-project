import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa"; // For the edit icon
import { useAuth } from "../../../../Context/AuthContext";
import vehicleService from "../../../../services/vehicle.service";

const GetAllVehiclesPerCustomer = ({ styles }) => {
  const { customerId } = useParams();
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const [vehicles, setVehicles] = useState([]); // Expect an array of vehicles
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    const fetchAllCustomerVehicles = async () => {
      try {
        // Fetch all vehicles for the customer
        const response = await vehicleService.GetAllVehiclesPerCustomer(
          token,
          customerId
        );

        if (response && Array.isArray(response.vehicles)) {
          setVehicles(response.vehicles); // Set the vehicles array
        } else {
          setError("Unexpected response format from the server.");
        }
      } catch (err) {
        setError(err.message); // Set the error state
      }
    };

    if (token && customerId) {
      fetchAllCustomerVehicles(); // Call the fetch function
    }
  }, [token, customerId]);

  if (error) {
    return <div style={styles.noVehicles}>Error: {error}</div>;
  }

  if (vehicles.length === 0) {
    return (
      <div style={styles.noVehicles}>No vehicles found for this customer.</div>
    );
  }

  return (
    <div className="d-flex">
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.vehicle_id} className="vehicle-item ">
            <div style={styles.section}>
              <h2 style={styles.customerName}>{vehicle.vehicle_model}</h2>
              <p style={styles.customerInfo}>
                <strong>Vehicle Color:</strong> {vehicle.vehicle_color}
              </p>
              <p style={styles.customerInfo}>
                <strong>Vehicle Tag:</strong> {vehicle.vehicle_tag}
              </p>
              <p style={styles.customerInfo}>
                <strong>Vehicle Year:</strong> {vehicle.vehicle_year}
              </p>
              <p style={styles.customerInfo}>
                <strong>Vehicle Mileage:</strong> {vehicle.vehicle_mileage}
              </p>
              <p style={styles.customerInfo}>
                <strong>Vehicle Serial:</strong> {vehicle.vehicle_serial}
              </p>
              <Link
                to={`/admin/vehicle/${vehicle.vehicle_id}`}
                style={styles.editButton}
              >
                Edit Vehicle info <FaRegEdit color="red" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllVehiclesPerCustomer;
