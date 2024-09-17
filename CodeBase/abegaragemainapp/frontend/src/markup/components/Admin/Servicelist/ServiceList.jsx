import React, { useState, useEffect } from "react";
import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../Context/AuthContext";
import { FaRegEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function ServiceList() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  // Selected service state
  const [show, setShow] = useState(false); // Modal state
  const [selectedService, setSelectedService] = useState(null);

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  const navigate = useNavigate();

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

  const handleShow = (service) => {
    setShow(true);
    setSelectedService(service);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedService(null);
  };
  const handleEditClick = (service) => {
    // Navigate to the edit page with the service ID
    navigate(`/admin/services/update/${service.service_id}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div
        className="container mb-5"
        style={{
          maxWidth: "800px",
        }}
      >
        <h2 className="contact-title my-3">Services we provide </h2>
        <small className="text">
          Bring to the table win-win survival strategies to ensure proactive
          domination. At the end of the day, going forward, an new normal that
          has evolved from generation X is on the runway heading towards a
          streamlined cloud solution.
        </small>
      </div>

      {services?.length > 0 ? (
        services?.map((service) => (
          <div
            key={service.service_id}
            className="container"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              marginBottom: "30px",
            }}
          >
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
              {service.service_name}
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <small
                style={{
                  fontSize: "16px",
                  color: "#555",
                  width: "90%",
                  textAlign: "justify",
                  paddingLeft: "20px",
                }}
              >
                {service.service_description}
              </small>
              <div style={{ display: "flex", gap: "10px" }}>
                <Link to={`/edit-service/${service.service_id}`}>
                  <FaRegEdit />
                </Link>
                <Link to={`/admin/services/${service.service_id}`}>
                  <MdDelete />
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No services found</div>
      )}
    </>
  );
}

export default ServiceList;
