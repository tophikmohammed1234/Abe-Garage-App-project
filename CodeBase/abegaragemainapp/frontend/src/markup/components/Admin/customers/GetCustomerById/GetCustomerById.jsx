import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa"; // Edit icon
import { useParams } from "react-router-dom";
import customerService from "../../../../../services/customer.service";
import { useAuth } from "../../../../../Context/AuthContext";

const GetCustomerById = () => {
  const { id } = useParams(); // Get customer ID from the URL
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  const [customer, setCustomer] = useState({});
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = await customerService.getCustomerById(token, id);
        setCustomer(customerData.data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (token && id) {
      fetchCustomer();
    }
  }, [token]);

  // Return if customer is not fetched or there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Title */}
     

      {/* Customer Info Card */}
      <div style={styles.card}>
        <div style={styles.customerDetails}>
          <h3>
            {customer.customer_first_name} {customer.customer_last_name}
          </h3>
          <p>
            <strong>Email:</strong> {customer.customer_email}
          </p>
          <p>
            <strong>Phone Number:</strong> {customer.customer_phone_number}
          </p>
          <p>
            <strong>Active Customer:</strong>{" "}
            {customer.active_customer_status ? "Yes" : "No"}
          </p>
          <Link to={`/admin/customer/${id}`} style={styles.editLink}>
            Edit customer info <FaRegEdit color="red" />
          </Link>
        </div>

        {/* Delete Button */}
        <div style={styles.deleteButton}>
          <button style={styles.deleteIcon}>X</button>
        </div>
      </div>

      {/* Edit Link */}
    </div>
  );
};

// Styling
const styles = {
  container: {
    margin: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
    position: "relative",
  },
  underline: {
    display: "inline-block",
    width: "100px",
    height: "2px",
    backgroundColor: "red",
    marginTop: "5px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    borderRadius: "8px",
  },
  customerDetails: {
    fontSize: "16px",
    color: "#333",
    lineHeight: "1.5",
  },
  deleteButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default GetCustomerById;
