import React, { useEffect, useState } from "react";
import AddVehicleForm from "../components/Admin/AddVehicleForm/AddVehicleForm";
import { Link, useParams } from "react-router-dom";
import customerService from "../../services/customer.service";
import { useAuth } from "../../Context/AuthContext";
import { FaRegEdit } from "react-icons/fa";

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
        const customerData = await customerService.getCustomerById(token, id);
        // const VehicleData=await customerService(token, id);
        setCustomer(customerData.data);
        // setVehicles(vehicleData.vehicles || []); // Assuming customerData contains vehicles
        // setOrders(orderData.orders || []); // Assuming customerData contains orders
      } catch (err) {
        setError(err.message);
      }
    };

    if (token && customerId) {
      fetchCustomer();
    }
  }, [token, customerId]);
  console.log(customer);
  const styles = {
    page: {
      fontFamily: "Arial, sans-serif",
      color: "#222B48",
      padding: "20px 0",
      backgroundColor: "#f5f5f5",
    },
    section: {
      padding: "20px",
      marginBottom: "20px",
      borderRadius: "8px",
      width: "80%",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    },
    customerName: {
      fontSize: "24px",
      marginBottom: "10px",
      fontWeight: "bold",
    },
    customerInfo: {
      margin: "5px 0",
      fontSize: "16px",
    },
    editButton: {
      border: "none",
      color: "#222B48",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
   
    },
    sectionTitle: {
      fontSize: "20px",
      marginBottom: "10px",
      fontWeight: "bold",
    },
    noVehicles: {
      fontSize: "16px",
      color: "#999",
      backgroundColor: "#fff",
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
      margin: "40px 40px 0 0",
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
              <h2 style={styles.customerName}>
                Customer: {customer.customer_first_name}{" "}
                {customer.customer_last_name}
              </h2>
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
                Edit customer info {<FaRegEdit color="red" />}
              </Link>
            </div>
          </div>

          {/* Vehicles Section */}
          <div className="d-flex">
            <div style={styles.sidebarCircle}>Cars</div>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                Vehicles of {customer.customer_first_name}
              </h3>
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
              <AddVehicleForm customerId={customerId} />
            </div>
          </div>
          {/* Orders Section */}
          <div className="d-flex">
            <div style={styles.sidebarCircle}>Orders</div>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                Orders of {customer.customer_first_name}
              </h3>
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
