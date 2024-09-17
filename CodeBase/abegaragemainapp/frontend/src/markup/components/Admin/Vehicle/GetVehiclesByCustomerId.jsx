import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";
import vehicleService from "../../../../services/vehicle.service";
import { FaHandPointer } from "react-icons/fa";

const GetVehiclesByCustomerId = () => {
  const { id: customer_id } = useParams(); // Get customer ID from route params
  const { employee } = useAuth(); // Get employee data from AuthContext
  const [token, setToken] = useState(null); // Store token
  const [vehicles, setVehicles] = useState(null); // Store vehicles data
  const [error, setError] = useState(null); // Store errors
  const [loading, setLoading] = useState(true); // Store loading state

  // Load the token when the component mounts
  useEffect(() => {
    if (employee && employee.employee_token) {
      setToken(employee.employee_token); // Set token from employee context
    } else {
      setError("Token is missing.");
      setLoading(false); // Stop loading if token is missing
    }
  }, [employee]);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (token && customer_id) {
        try {
          const result = await vehicleService.GetAllVehiclesPerCustomer(
            token,
            customer_id
          );
          if (result.error) {
            setError(result.error); // Handle error response from API
          } else {
            setVehicles(result.vehicles); // Set vehicles from API response
          }
        } catch (err) {
          setError("Failed to fetch vehicles.");
        } finally {
          setLoading(false); // Stop loading after API call
        }
      }
    };

    if (token) {
      fetchVehicles(); // Fetch vehicles once token is available
    }
  }, [token, customer_id]);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  if (!vehicles || vehicles.length === 0) {
    return <div>No vehicles found for this customer.</div>; // Display message when no vehicles are found
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Choose a vehicle</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Year</th>
            <th style={styles.th}>Make</th>
            <th style={styles.th}>Model</th>
            <th style={styles.th}>Tag</th>
            <th style={styles.th}>Serial</th>
            <th style={styles.th}>Color</th>
            <th style={styles.th}>Mileage</th>
            <th style={styles.th}>Choose</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.vehicle_id}>
              <td style={styles.td}>{vehicle.vehicle_year}</td>
              <td style={styles.td}>{vehicle.vehicle_make}</td>
              <td style={styles.td}>{vehicle.vehicle_model}</td>
              <td style={styles.td}>{vehicle.vehicle_tag}</td>
              <td style={styles.td}>{vehicle.vehicle_serial}</td>
              <td style={styles.td}>{vehicle.vehicle_color}</td>
              <td style={styles.td}>{vehicle.vehicle_mileage}</td>
              <td style={styles.td}>
                <Link
                  to={`/admin/order/customer/service/${customer_id}/${vehicle.vehicle_id}`}
                >
                  <FaHandPointer style={styles.link} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  link: {
    color: "black",
  },
  container: {
    margin: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
};

export default GetVehiclesByCustomerId;
