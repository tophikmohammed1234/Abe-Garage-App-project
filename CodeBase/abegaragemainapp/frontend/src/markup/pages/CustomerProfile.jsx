import React, { useEffect, useState } from "react";
import AddVehicleForm from "../components/Admin/AddVehicleForm/AddVehicleForm";
import { Link, useParams } from "react-router-dom";
import customerService from "../../services/customer.service";
import { useAuth } from "../../Context/AuthContext";

const CustomerPage = () => {
  const { customerId } = useParams(); // Get customer id from URL
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  const [customer, setCustomer] = useState({});
  const [vehicles, setVehicles] = useState([]); // Dynamic vehicles
  const [orders, setOrders] = useState([]); // Dynamic orders
  const [error, setError] = useState(null); // State to handle errors
const id = customerId;
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        // Directly use customerData as it's already parsed
        const customerData = await customerService.getCustomerById(
          token,
          id
        );
        setCustomer(customerData.data);
        setVehicles(customerData.vehicles || []); // Assuming customerData contains vehicles
        setOrders(customerData.orders || []); // Assuming customerData contains orders
      } catch (err) {
        setError(err.message);
      }
    };

    if (token && customerId) {
      fetchCustomer();
    }
  }, [token, customerId]);
console.log(customer)
  const styles = {
    page: {
      fontFamily: "Arial, sans-serif",
      color: "#333",
      padding: "20px",
      backgroundColor: "#f5f5f5",
    },
    section: {
      padding: "20px",
      marginBottom: "20px",
      borderRadius: "8px",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
    },
    customerName: {
      fontSize: "24px",
      marginBottom: "10px",
    },
    customerInfo: {
      margin: "5px 0",
      fontSize: "16px",
    },
    editButton: {
      backgroundColor: "transparent",
      border: "none",
      color: "#e74c3c",
      fontSize: "14px",
      cursor: "pointer",
      marginTop: "10px",
      padding: 0,
      display: "inline-block",
    },
    sectionTitle: {
      fontSize: "20px",
      marginBottom: "10px",
    },
    noVehicles: {
      fontSize: "16px",
      color: "#999",
    },
    addVehicleButton: {
      backgroundColor: "#e74c3c",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "4px",
    },
    ordersPlaceholder: {
      fontSize: "16px",
      color: "#999",
    },
    sidebar: {
      marginRight: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    sidebarCircle: {
      width: "80px", // Increased size
      height: "80px", // Increased size
      borderRadius: "50%",
      backgroundColor: "#e74c3c", // Red circle
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "16px", // Larger text inside the circle
      marginBottom: "20px",
    },
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.page}>
      {/* Sidebar with red circles */}
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={styles.sidebar}>
          {/* Info Circle */}

          {/* Cars Circle */}
          {/* Orders Circle */}
        </div>

        <div style={{ flexGrow: 1 }}>
          {/* Customer Information Section */}
          <div className="d-flex">
            <div style={styles.sidebarCircle}>Info</div>
            <div style={styles.section}>
              <h2 style={styles.customerName}>Customer: {customer.name}</h2>
              <p style={styles.customerInfo}>
                <strong>Email:</strong> {customer.customer_email}
              </p>
              <p style={styles.customerInfo}>
                <strong>Phone Number:</strong> {customer.customer_phone_number}
              </p>
              <p style={styles.customerInfo}>
                <strong>Active Customer:</strong>{" "}
                {customer.active_customer_status ? "Yes" : "No"}
              </p>
              <Link
                to={`/admin/customer/${customerId}`}
                style={styles.editButton}
              >
                Edit customer info ✏️
              </Link>
            </div>
          </div>

          {/* Vehicles Section */}
          <div className="d-flex">
            <div style={styles.sidebarCircle}>Cars</div>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Vehicles of {customer.name}</h3>
              {vehicles.length === 0 ? (
                <div style={styles.noVehicles}>
                  <p>No vehicle found</p>
                </div>
              ) : (
                <ul>
                  {vehicles.map((vehicle, index) => (
                    <li key={index}>{vehicle}</li>
                  ))}
                </ul>
              )}
              {/* <button style={styles.addVehicleButton}>ADD NEW VEHICLE</button> */}
              <AddVehicleForm customerId={customerId} />
            </div>
          </div>
          {/* Orders Section */}
          <div className="d-flex">
            <div style={styles.sidebarCircle}>Orders</div>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Orders of {customer.name}</h3>
              {orders.length === 0 ? (
                <p style={styles.ordersPlaceholder}>
                  Orders will be displayed here
                </p>
              ) : (
                <ul>
                  {orders.map((order, index) => (
                    <li key={index}>{order}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
