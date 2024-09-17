
import React, { useState, useEffect } from "react";
import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../Context/AuthContext";
import GetVehicleById from "../GetVehicleById/GetVehicleById";
import GetCustomerById from "../customers/GetCustomerById/GetCustomerById";


function ChooseService() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [additionalRequests, setAdditionalRequests] = useState({
    description: "",
    price: "",
  });

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

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
    loadServices();
  }, [token]);

  const handleCheckboxChange = (serviceId) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdditionalRequests((prevRequests) => ({
      ...prevRequests,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform submit logic here
    console.log("Selected Services:", selectedServices);
    console.log("Additional Requests:", additionalRequests);
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
              {services?.length > 0 ? (
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
            </div>

            {/* Additional Requests Section */}
            <div style={styles.additionalRequestsContainer}>
              <h3 style={styles.additionalHeader}>Additional requests</h3>
              <textarea
                name="description"
                value={additionalRequests.description}
                onChange={handleInputChange}
                placeholder="Service description"
                style={styles.textarea}
              />
              <input
                name="price"
                type="text"
                value={additionalRequests.price}
                onChange={handleInputChange}
                placeholder="Price"
                style={styles.input}
              />
            </div>

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
