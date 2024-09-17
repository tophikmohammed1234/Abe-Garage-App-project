import GetVehicleById from "../GetVehicleById/GetVehicleById";
import GetCustomerById from "../customers/GetCustomerById/GetCustomerById";

import React, { useState, useEffect } from "react";
import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../Context/AuthContext";
import { useParams } from "react-router-dom";
import { createOrder } from "../../../../services/order.service";

function ChooseService() {
  const { id: customer_id, vehicleId: vehicle_id } = useParams(); // Extract customer and vehicle IDs from params
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const employee_id = employee?.employee_id;

  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [additional_request, setAdditionalRequest] = useState(); // Store description only
  const [order_total_price, setOrderTotalPrice] = useState(); // Store price separately
  const [serviceIdError, setServiceIdError] = useState();
  const [serverError, setServerError] = useState();

  const additional_requests_completed = 0; // Defaults to 0, adjust if needed
  const order_status = 0; // You can define order status as per your business logic

  // Load services from the serviceService API
  useEffect(() => {
    const loadServices = async () => {
      try {
        const servicesData = await serviceService.getService(token);
        const data = await servicesData.json();
        setServices(data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    if (token) {
      loadServices();
    }
  }, [token]);

  // Handle checkbox change for selecting services
  const handleCheckboxChange = (id) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((serviceId) => serviceId !== id) // Uncheck
        : [...prevSelected, id] // Check
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if services are selected
    if (selectedServices.length === 0) {
      setServiceIdError("At least one service must be selected");
      return;
    }

    // Create the order data
    const formData = {
      vehicle_id,
      customer_id,
      employee_id,
      additional_request, // The service description
      order_total_price, // The price of the additional request
      additional_requests_completed,
      order_status, // Status of the order
      services: selectedServices.map((serviceId) => ({
        service_id: serviceId,
        service_completed: 0,
      })),
    };

    try {
      const response = await createOrder(formData, token);
      const data = await response.json();
      console.log(formData);
      if (data.error) {
        setServerError(data.error);
      } else {
        setServerError("");
        setTimeout(() => {
          window.location.href = "/admin/employees"; // Redirect after successful order creation
        }, 2000);
      }
    } catch (error) {
      setServerError("Failed to create the order.");
    }
  };

  return (
    <>
      <GetCustomerById />
      <GetVehicleById />
      <div style={styles.outreContainer}>
        <div style={styles.pageContainer}>
          <form onSubmit={handleSubmit}>
            <div style={styles.serviceSelectionContainer}>
              <h2 style={styles.header}>Choose service</h2>
              {error && <div style={styles.error}>{error}</div>}
              {services.length > 0 ? (
                services.map((service) => (
                  <div key={service.service_id} style={styles.serviceCard}>
                    <div style={styles.serviceDetails}>
                      <h3 style={styles.serviceTitle}>
                        {service.service_name}
                      </h3>
                      <p style={styles.serviceDescription}>
                        {service.service_description}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.service_id)}
                      onChange={() => handleCheckboxChange(service.service_id)}
                      style={styles.checkbox}
                    />
                  </div>
                ))
              ) : (
                <div>No services found</div>
              )}
              {serviceIdError && (
                <div style={styles.error}>{serviceIdError}</div>
              )}
            </div>

            {/* Additional Requests Section */}
            <div style={styles.additionalRequestsContainer}>
              <h3 style={styles.additionalHeader}>Additional requests</h3>
              <textarea
                name="description"
                value={additional_request} // Handles only description
                onChange={(e) => setAdditionalRequest(e.target.value)}
                placeholder="Service description"
                style={styles.textarea}
              />
              <input
                name="price"
                type="number"
                value={order_total_price} // Handles only price
                onChange={(e) => setOrderTotalPrice(e.target.value)}
                placeholder="Price"
                style={styles.input}
              />
            </div>

            {serverError && <div style={styles.error}>{serverError}</div>}

            <button type="submit" style={styles.submitButton}>
              SUBMIT ORDER
            </button>
          </form>
        </div>
      </div>
    </>
  );
}



const styles = {
  pageContainer: {
    // maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
  },
  serviceSelectionContainer: {
    marginBottom: "40px",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  serviceCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  serviceDetails: {
    width: "80%",
  },
  serviceTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  serviceDescription: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "4px",
  },
  checkbox: {
    width: "20px",
    height: "20px",
  },
  additionalRequestsContainer: {
    marginBottom: "40px",
  },
  additionalHeader: {
    fontSize: "20px",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#333",
  },
  textarea: {
    width: "100%",
    height: "150px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#ff3333",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    display: "block",
    margin: "0 auto",
    width: "200px",
  },
};

export default ChooseService;
