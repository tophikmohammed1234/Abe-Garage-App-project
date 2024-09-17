import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";
import vehicleService from "../../../../services/vehicle.service";
import { FaHandPointer } from "react-icons/fa";

const GetVehiclesByCustomerId = () => {
  const id = useParams(); // Get vehicle ID from route params
  const customer_id = id.id;
  // console.log(customer_id.id);
  const { employee } = useAuth(); // Get employee data from AuthContext
  const token = employee ? employee?.employee_token : null; // Get token
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (token && customer_id) {
        const result = await vehicleService.GetAllVehiclesPerCustomer(
          token,
          customer_id
        );
        // console.log(result);
        if (result.error) {
          setError(result.error);
        } else {
          setVehicle(result.vehicles);
          console.log(result.vehicles[0]);
        }
      } else {
        setError("Token or Vehicle ID missing.");
      }
    };

    fetchVehicle();
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!vehicle) {
    return <div>Loading...</div>;
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
          {/* map through vehicles */}
          {vehicle.map((vehicle) => (
            <tr>
              <td style={styles.td}>{vehicle.vehicle_year}</td>
              <td style={styles.td}>{vehicle.vehicle_make}</td>
              <td style={styles.td}>{vehicle.vehicle_model}</td>
              <td style={styles.td}>{vehicle.vehicle_tag}</td>
              <td style={styles.td}>{vehicle.vehicle_serial}</td>
              <td style={styles.td}>{vehicle.vehicle_color}</td>
              <td style={styles.td}>{vehicle.vehicle_mileage}</td>
              <td style={styles.td}>
                <span role="img" aria-label="select">
                  <Link to={`/admin/order/customer/service/${customer_id}/${vehicle.vehicle_id}`}>
                    <FaHandPointer style={styles.link} />
                  </Link>
                </span>
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
  button: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};



export default GetVehiclesByCustomerId;
