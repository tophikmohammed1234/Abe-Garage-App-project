
import React, { useState, useEffect } from "react";
import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../Context/AuthContext";
<<<<<<< HEAD
=======

>>>>>>> 55854da01a37a6fd0887368e76a6caed354a5f02

// function SelectService() {
//   const [services, setServices] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedServices, setSelectedServices] = useState([]);

//   const { employee } = useAuth();
//   const token = employee ? employee.employee_token : null;

//   useEffect(() => {
//     const loadServices = async () => {
//       try {
//         const servicesData = await serviceService.getService(token);
//         const data = await servicesData.json();
//         setServices(data.data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };
//     loadServices();
//   }, [token]);

//   const handleCheckboxChange = (serviceId) => {
//     setSelectedServices((prevSelected) =>
//       prevSelected.includes(serviceId)
//         ? prevSelected.filter((id) => id !== serviceId)
//         : [...prevSelected, serviceId]
//     );
//   };

//   const styles = {
//     outerContainer: {
//       maxWidth: "800px",
//       margin: "20px auto",
//       padding: "30px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//       borderRadius: "8px",
//       border: "1px solid #ccc",
//       backgroundColor: "#f9f9f9",
//     },
//     header: {
//       fontSize: "22px",
//       fontWeight: "bold",
//       marginBottom: "20px",
//       color: "#333",
//     },
//     container: {
//     //   maxWidth: "600px",
//       margin: "10px auto",
//       padding: "20px",
//       boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//       borderRadius: "8px",
//       border: "1px solid #ccc",
//       backgroundColor: "#fff",
//     },
//     serviceHeader: {
//       fontSize: "18px",
//       fontWeight: "bold",
//       marginBottom: "8px",
//     },
//     descriptionContainer: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     descriptionText: {
//       fontSize: "14px",
//       color: "#555",
//       width: "85%",
//       textAlign: "left",
//     },
//     checkboxContainer: {
//       display: "flex",
//       alignItems: "center",
//     },
//     checkbox: {
//       marginLeft: "10px",
//     },
//     serviceWrapper: {
//       marginBottom: "20px",
//     },
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div style={styles.outerContainer}>
//       <h2 style={styles.header}>Choose Service</h2>
//       {services?.length > 0 ? (
//         services?.map((service) => (
//           <div key={service.service_id} style={styles.container}>
//             <div style={styles.serviceWrapper}>
//               <div style={styles.descriptionContainer}>
//                 <div>
//                   <h3 style={styles.serviceHeader}>{service.service_name}</h3>
//                   <small style={styles.descriptionText}>
//                     {service.service_description}
//                   </small>
//                 </div>
//                 <div style={styles.checkboxContainer}>
//                   <input
//                     type="checkbox"
//                     style={styles.checkbox}
//                     checked={selectedServices.includes(service.service_id)}
//                     onChange={() => handleCheckboxChange(service.service_id)}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div>No services found</div>
//       )}
//     </div>
//   );
// }

// export default SelectService;

import React from 'react'
import GetCustomerById from '../customers/GetCustomerById/GetCustomerById'
import GetVehicleById from '../GetVehicleById/GetVehicleById';

function ChooseService() {
  return (
    <div>
      <GetCustomerById />
      <GetVehicleById/>
      {/* use here */}
    </div>
  );
}

export default ChooseService
